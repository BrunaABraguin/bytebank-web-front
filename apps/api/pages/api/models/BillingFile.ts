import mongoose, { Schema, Document } from "mongoose";

export interface IBillingFile extends Document {
  email: string;
  filename: string;
  mimetype: string;
  size: number;
  uploadDate: Date;
  file: Buffer;
}

const BillingFileSchema: Schema = new Schema<IBillingFile>({
  email: { type: String, required: true, trim: true },
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
  file: { type: Buffer, required: true },
});

export default mongoose.models.BillingFile ||
  mongoose.model<IBillingFile>("BillingFile", BillingFileSchema);
