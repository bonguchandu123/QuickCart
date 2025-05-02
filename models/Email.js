import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // <-- Ensures one subscription per email
    lowercase: true,
    trim: true,
  },
}, { timestamps: true });

const Email = mongoose.models.email || mongoose.model("email", emailSchema);
export default Email;
