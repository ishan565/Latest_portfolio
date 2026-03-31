import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxLength: 254,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxLength: 2000,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
