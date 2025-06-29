import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
  ownerId: string;
  balance: number;
}

const AccountSchema: Schema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Account ||
  mongoose.model<IAccount>("Account", AccountSchema);
