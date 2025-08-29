import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    rollNo: { type: String, required: true, trim: true },
    technology: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0 },
    date: { type: String, required: true }, // storing formatted UI date you already have
    // optional fields if you later store a PDF URL or sharing data:
    pdfUrl: { type: String },
    sharedVia: { type: [String], default: [] }, // e.g. ["whatsapp","email"]
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", CertificateSchema);
