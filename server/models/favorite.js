import mongoose from "mongoose";
import Schema from "mongoose";

const Favorite = mongoose.model(
  "Favorite",
  new mongoose.Schema({
    favoritedBy: {
      type: String,
    },
    trackId: {
      type: String,
    },
    trackTitle: {
      type: String,
    },
    trackArtist: {
      type: String,
    },
    trackCover: {
      type: String,
    },
    trackAlbum: {
      type: String,
    },
  })
);
export default Favorite;
