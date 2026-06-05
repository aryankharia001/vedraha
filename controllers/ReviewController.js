import Review from "../models/Review.js";

const sanitizeString = (v, max = 2000) => {
  if (v === undefined || v === null) return "";
  return String(v).trim().slice(0, max);
};

const sanitizePhotos = (arr) => {
  if (!Array.isArray(arr)) return [];
  return arr
    .map((p) => sanitizeString(p, 1000))
    .filter((p) => /^https?:\/\//i.test(p))
    .slice(0, 6);
};

// ── GET /api/reviews?productId=&page=&limit=&rating= ──────────────────────────
export const getReviews = async (req, res) => {
  try {
    const { productId, rating, sort } = req.query;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "productId is required" });
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, parseInt(req.query.limit, 10) || 5)
    );
    const skip = (page - 1) * limit;

    const filter = { productId, isApproved: true };
    if (rating) {
      const r = parseInt(rating, 10);
      if (r >= 1 && r <= 5) filter.rating = r;
    }

    let sortOption = { createdAt: -1 };
    if (sort === "highest") sortOption = { rating: -1, createdAt: -1 };
    if (sort === "lowest") sortOption = { rating: 1, createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const [reviews, total] = await Promise.all([
      Review.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),
      Review.countDocuments(filter),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    console.error("getReviews error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};

// ── GET /api/reviews/summary?productId= ───────────────────────────────────────
export const getReviewSummary = async (req, res) => {
  try {
    const { productId } = req.query;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "productId is required" });
    }

    const [agg] = await Review.aggregate([
      { $match: { productId, isApproved: true } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          avg: { $avg: "$rating" },
        },
      },
    ]);

    const breakdown = await Review.aggregate([
      { $match: { productId, isApproved: true } },
      { $group: { _id: "$rating", count: { $sum: 1 } } },
    ]);

    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    breakdown.forEach((b) => {
      if (counts[b._id] !== undefined) counts[b._id] = b.count;
    });

    const total = agg?.total || 0;
    const avg = total > 0 ? Math.round((agg.avg + Number.EPSILON) * 100) / 100 : 0;

    return res.status(200).json({
      success: true,
      data: {
        total,
        avg,
        counts,
      },
    });
  } catch (err) {
    console.error("getReviewSummary error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};

// ── POST /api/reviews ─────────────────────────────────────────────────────────
export const createReview = async (req, res) => {
  try {
    const { productId, name, email, rating, title, body, photos } = req.body;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "productId is required" });
    }
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    const r = Number(rating);
    if (!Number.isInteger(r) || r < 1 || r > 5) {
      return res
        .status(400)
        .json({ success: false, message: "Rating must be between 1 and 5" });
    }

    const review = new Review({
      productId: sanitizeString(productId, 200),
      name: sanitizeString(name, 80),
      email: sanitizeString(email, 160),
      rating: r,
      title: sanitizeString(title, 120),
      body: sanitizeString(body, 2000),
      photos: sanitizePhotos(photos),
    });

    await review.save();
    return res
      .status(201)
      .json({ success: true, message: "Review submitted", data: review });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    console.error("createReview error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};

// ── DELETE /api/reviews/:id ───────────────────────────────────────────────────
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    await review.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Review deleted" });
  } catch (err) {
    console.error("deleteReview error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};
