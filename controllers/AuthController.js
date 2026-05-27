import NabhiUser from "../models/NabhiUser.js";
import jwt from "jsonwebtoken";

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
      },
    });
  } catch (err) {
    console.error("Login error:", err);
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