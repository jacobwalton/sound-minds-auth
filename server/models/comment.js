import mongoose from "mongoose";

const Comment = mongoose.model(
  "Track",
  new mongoose.Schema({
    trackId: { type: Number },
    comment: [
      {
        commentBy: { type: String },
        content: { type: String },
      },
      { timestamps: true },
    ],
  })
);
export default Comment;
