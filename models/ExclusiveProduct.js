import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    // URL returned by MinIO/Cloudinary — used directly in frontend
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    // Storage public ID — used to delete the image when product is updated/deleted
    imagePublicId: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Original price is required"],
      min: 0,
    },
    discountedPrice: {
      type: Number,
      required: [true, "Discounted price is required"],
      min: 0,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    lang:{
      required:true,
      type:String
    },
    path:{
      required:true,
      type:String
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-compute discountPercent before every save
productSchema.pre("save", function () {
  if (this.price > 0) {
    this.discountPercent = Math.round(
      ((this.price - this.discountedPrice) / this.price) * 100
    );
  }
});

export default mongoose.model("ExclusiveProduct", productSchema);