import mongoose from "mongoose";

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema(
    {
      commentBy: { type: String },
      content: { type: String },
      trackId: { type: Number },
    },
    { timestamps: true }
  )
);
export default Comment;
