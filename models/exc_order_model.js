import mongoose from "mongoose";
import axios from "axios";

const excCustomerSchema = new mongoose.Schema({
  fullName:  { type: String, required: true },
  phone:     { type: String, required: true },
  email:     { type: String, default: "" },
  address:   { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: true },
  pincode:   { type: String, required: true },
});

const excProductSnapshotSchema = new mongoose.Schema({
  label:     { type: String },
  price:     { type: String },
  priceNum:  { type: Number },
  qty:       { type: Number },
  variantId: { type: String },
});

const excPaymentInfoSchema = new mongoose.Schema({
  paymentType:   { type: String },
  paymentStatus: { type: String },
  transactionId: { type: String },
});

const excLeadResponseSchema = new mongoose.Schema({
  leadId:      { type: String },
  leadOrderId: { type: String },
  status:      { type: String },
  total:       { type: Number },
  savedAt:     { type: Date },
  rawResponse: { type: mongoose.Schema.Types.Mixed },
});

const excOrderSchema = new mongoose.Schema(
  {
    orderId:       { type: String, required: true, unique: true },
    customer:      { type: excCustomerSchema, required: true },
    product:       { type: excProductSnapshotSchema },
    paymentMethod: { type: String },
    paymentInfo:   { type: excPaymentInfoSchema },
    totalPrice:    { type: Number, required: true },
    isPaid:        { type: Boolean, default: false },
    paidAt:        { type: Date },
    status:        { type: String, default: "pending" },

    leadSaved:     { type: Boolean, default: false },
    leadResponse:  { type: excLeadResponseSchema },

    postbackFired: { type: Boolean, default: false },

    utm: {
      source:   String,
      medium:   String,
      campaign: String,
      subid:    String,
    },
    notes: { type: String },
  },
  { timestamps: true }
);

excOrderSchema.index({ "customer.phone": 1 });
excOrderSchema.index({ status: 1 });
excOrderSchema.index({ leadSaved: 1 });
excOrderSchema.index({ postbackFired: 1 });
excOrderSchema.index({ createdAt: -1 });

const ExcOrder = mongoose.model("ExcOrder", excOrderSchema);

export default ExcOrder;