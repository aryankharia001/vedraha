// ─── models/MetaEventLog.js ───────────────────────────────────────────────────
import mongoose from "mongoose";

const MetaEventLogSchema = new mongoose.Schema({
  event_name: { type: String, required: true },
  dedup_key:  { type: String, required: true, unique: true }, // event_name + cart_id + click_id
  fired_at:   { type: Date, default: Date.now },
});

export const MetaEventLog = mongoose.model("MetaEventLog", MetaEventLogSchema);