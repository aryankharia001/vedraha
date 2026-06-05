import ContactMessage from "../models/ContactMessage.js";

const sanitizeString = (v, max = 2000) => {
  if (v === undefined || v === null) return "";
  return String(v).trim().slice(0, max);
};

const ALLOWED_LANGS = ["en", "hi", "ta", "te"];
const ALLOWED_STATUS = ["new", "read", "replied", "archived"];
const ALLOWED_CATEGORIES = ["product", "order", "wellness", "wholesale", "feedback", "other"];

// ── POST /api/contact  (public) ──────────────────────────────────────────────
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message, category, lang } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const cleanEmail = sanitizeString(email, 160).toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    const cleanPhone = sanitizeString(phone, 20).replace(/\D/g, "");
    if (cleanPhone && !/^[0-9]{10,15}$/.test(cleanPhone)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number" });
    }

    const cleanLang = ALLOWED_LANGS.includes(lang) ? lang : "en";
    const cleanCategory = ALLOWED_CATEGORIES.includes(category) ? category : "";

    const doc = await ContactMessage.create({
      name: sanitizeString(name, 80),
      email: cleanEmail,
      phone: cleanPhone,
      message: sanitizeString(message, 2000),
      category: cleanCategory,
      lang: cleanLang,
      ip:
        req.headers["cf-connecting-ip"] ||
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.ip ||
        "",
      userAgent: sanitizeString(req.headers["user-agent"], 500),
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been received. We will get back to you shortly.",
      data: { id: doc._id },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    console.error("createContactMessage error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── GET /api/admin/contact  (admin) ───────────────────────────────────────────
export const getContactMessages = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status && ALLOWED_STATUS.includes(req.query.status)) {
      filter.status = req.query.status;
    }
    if (req.query.lang && ALLOWED_LANGS.includes(req.query.lang)) {
      filter.lang = req.query.lang;
    }
    if (req.query.category && ALLOWED_CATEGORIES.includes(req.query.category)) {
      filter.category = req.query.category;
    }
    if (req.query.q) {
      const q = sanitizeString(req.query.q, 80);
      if (q) {
        const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        filter.$or = [{ name: rx }, { email: rx }, { message: rx }];
      }
    }
    if (req.query.archived === "true") filter.isArchived = true;
    if (req.query.archived === "false") filter.isArchived = false;

    const [items, total, statusAgg] = await Promise.all([
      ContactMessage.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ContactMessage.countDocuments(filter),
      ContactMessage.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));
    const statusCounts = { new: 0, read: 0, replied: 0, archived: 0 };
    statusAgg.forEach((s) => {
      if (statusCounts[s._id] !== undefined) statusCounts[s._id] = s.count;
    });

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      statusCounts,
    });
  } catch (err) {
    console.error("getContactMessages error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── GET /api/admin/contact/:id  (admin) ───────────────────────────────────────
export const getContactMessageById = async (req, res) => {
  try {
    const doc = await ContactMessage.findById(req.params.id);
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    if (doc.status === "new") {
      doc.status = "read";
      await doc.save();
    }
    return res.status(200).json({ success: true, data: doc });
  } catch (err) {
    console.error("getContactMessageById error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── PATCH /api/admin/contact/:id  (admin) ─────────────────────────────────────
export const updateContactMessage = async (req, res) => {
  try {
    const { status, isArchived } = req.body;
    const update = {};

    if (status !== undefined) {
      if (!ALLOWED_STATUS.includes(status)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid status value" });
      }
      update.status = status;
    }
    if (isArchived !== undefined) {
      update.isArchived = Boolean(isArchived);
    }

    const doc = await ContactMessage.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    return res.status(200).json({ success: true, data: doc });
  } catch (err) {
    console.error("updateContactMessage error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── DELETE /api/admin/contact/:id  (admin) ────────────────────────────────────
export const deleteContactMessage = async (req, res) => {
  try {
    const doc = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Message deleted" });
  } catch (err) {
    console.error("deleteContactMessage error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
