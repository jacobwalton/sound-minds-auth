import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: { type: String, unique: true, maxLength: 24 },
      email: { type: String, unique: true, trim: true },
      password: { type: String, minLength: 6 },
      favorites: [
        {
          trackId: { type: Number, unique: true },
          trackTitle: { type: String },
          trackArtist: { type: String },
          trackCover: { type: String },
        },
      ],
    },
    { timestamps: true }
  )
);
export default User;
