import NabhiUser from "../models/NabhiUser.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleIdToken = async (idToken) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload?.email || !payload?.email_verified) {
    throw new Error("Google account email is not verified");
  }
  return payload;
};

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// ── POST /api/auth/signup ──────────────────────────────────────────────────
export const signup = async (req, res) => {
  try {
    const { email, password, name, notifyOffers } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const exists = await NabhiUser.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return res.status(409).json({ success: false, message: "An account with this email already exists" });
    }

    const user = await NabhiUser.create({
      email: email.toLowerCase().trim(),
      password,
      name: name?.trim() || "",
      notifyOffers: !!notifyOffers,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        notifyOffers: user.notifyOffers,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── POST /api/auth/login ───────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await NabhiUser.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        notifyOffers: user.notifyOffers,
        isAdmin: !!user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── POST /api/auth/admin-login ─────────────────────────────────────────────
// Same as /login but returns 403 if the user is not flagged as admin.
// The frontend uses this to gate the contact-messages dashboard.
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await NabhiUser.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    if (!user.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Admin logged in",
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: true,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── POST /api/auth/google ─────────────────────────────────────────────────
// Verifies a Google ID token (from Google Identity Services popup) and
// finds or creates the corresponding NabhiUser. Returns the same
// { success, token, user } shape as /login so the frontend can treat the
// two flows identically.
export const googleLogin = async (req, res) => {
  try {
    const { idToken, credential } = req.body || {};
    const tokenToVerify = idToken || credential;
    if (!tokenToVerify) {
      return res.status(400).json({ success: false, message: "Google idToken is required" });
    }

    let payload;
    try {
      payload = await verifyGoogleIdToken(tokenToVerify);
    } catch (err) {
      console.error("Google token verification failed:", err.message);
      return res.status(401).json({ success: false, message: "Invalid or expired Google token" });
    }

    const email = payload.email.toLowerCase().trim();
    const googleId = payload.sub;
    const name = payload.name || "";
    const avatar = payload.picture || "";

    let user = await NabhiUser.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      user = await NabhiUser.create({
        email,
        googleId,
        name,
        avatar,
        // No password — Google-only account. If the user later wants to
        // set one, they can go through the profile update flow.
      });
    } else if (!user.googleId) {
      // Link the Google identity to the existing email-based account.
      user.googleId = googleId;
      if (!user.name && name) user.name = name;
      if (!user.avatar && avatar) user.avatar = avatar;
      await user.save();
    }

    const authToken = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Logged in with Google",
      token: authToken,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        notifyOffers: user.notifyOffers,
      },
    });
  } catch (err) {
    console.error("googleLogin error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── GET /api/auth/me ───────────────────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    const user = await NabhiUser.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── PUT /api/auth/update-profile ───────────────────────────────────────────
// Protected — requires a valid Bearer token in Authorization header.
// Accepts: { name?, email?, currentPassword?, newPassword? }
// If newPassword is provided, currentPassword must also be provided and correct.
export const updateProfile = async (req, res) => {
  try {
    // ── Verify token ────────────────────────────────────────────────────
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorised: no token provided" });
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch {
      return res.status(401).json({ success: false, message: "Unauthorised: invalid or expired token" });
    }

    const { name, email, currentPassword, newPassword } = req.body;

    // ── Load user (with password for comparison) ────────────────────────
    const user = await NabhiUser.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ── Name update ─────────────────────────────────────────────────────
    if (name !== undefined) {
      user.name = name.trim();
    }

    // ── Email update ─────────────────────────────────────────────────────
    if (email !== undefined) {
      const normalized = email.toLowerCase().trim();
      if (normalized !== user.email) {
        const taken = await NabhiUser.findOne({ email: normalized });
        if (taken) {
          return res.status(409).json({ success: false, message: "This email is already in use by another account" });
        }
        user.email = normalized;
      }
    }

    // ── Password change ──────────────────────────────────────────────────
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: "Current password is required to set a new password" });
      }
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Current password is incorrect" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });
      }
      user.password = newPassword; // hashed by pre-save hook in your model
    }

    await user.save();

    // Issue a fresh token (email may have changed, so keep it consistent)
    const newToken = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      token: newToken,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        notifyOffers: user.notifyOffers,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    console.error("updateProfile error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};