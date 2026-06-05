import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, "productId is required"],
      trim: true,
      index: true,
    },
    productModel: {
      type: String,
      enum: ["ExclusiveProduct", "Product", "Nabhi"],
      default: "ExclusiveProduct",
    },
    name: {
      type: String,
      required: [true, "Reviewer name is required"],
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    body: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    photos: {
      type: [String],
      default: [],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ productId: 1, createdAt: -1 });
reviewSchema.index({ productId: 1, isApproved: 1, createdAt: -1 });

export default mongoose.model("Review", reviewSchema);
