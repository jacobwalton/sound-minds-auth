import mongoose from "mongoose";

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema(
    {
      commentBy: { type: String },
      content: { type: String, required: true, minLength: 1, maxLength: 400 },
      trackId: { type: Number },
    },
    { timestamps: true }
  )
);
export default Comment;
