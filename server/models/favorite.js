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

//different "favorite" method
//When user favorites a song, it pushes the song id to the user collection under a key "favs".
//When user removes a song it pops the song from the "favs" array.
//To read all of a user's favorites, the array can just be mapped over and displayed.
//If song id is present in the array, the text should read "remove"
//If song id is NOT present in the array, the text should read "add"
