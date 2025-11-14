import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  ownerEmail: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  lastUpdate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

AccountSchema.index({ ownerEmail: 1 });

const Account =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);

export default Account;
