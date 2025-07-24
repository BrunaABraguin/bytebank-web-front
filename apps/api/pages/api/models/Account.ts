import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
  ownerEmail: string;
  balance: number;
}

const AccountSchema: Schema = new Schema(
  {
    ownerEmail: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    income: {
      type: Number,
      default: 0,
    },
    expense: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Account ||
  mongoose.model<IAccount>("Account", AccountSchema);
