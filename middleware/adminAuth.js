import jwt from "jsonwebtoken";
import NabhiUser from "../models/NabhiUser.js";

// Verify JWT and require isAdmin === true
export const requireAdmin = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await NabhiUser.findById(decoded.id).select("isAdmin email name");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, user not found" });
    }
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden — admin access required" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("requireAdmin error:", err);
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};
