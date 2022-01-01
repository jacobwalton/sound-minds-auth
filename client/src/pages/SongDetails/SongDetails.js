import { useEffect, useState, useContext } from "react";
import Colors from "../../components/Colors/Colors";
import "./song-details.css";
import UserContext from "../../helpers/UserContext";
import axios from "axios";

const SongDetails = (props) => {
  const [trackLoading, setTrackLoading] = useState(true);
  let trackId = props.match.params.trackId;
  const [track, setTrack] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackCover, setTrackCover] = useState();
  const [trackAlbum, setTrackAlbum] = useState();
  const user = useContext(UserContext);
  const [favorited, setFavorited] = useState(false);

  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    fetch(
      `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${trackId}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTrack(res);
        setTrackTitle(res.title);
        setTrackArtist(res.artist.name);
        setTrackCover(res.album.cover);
        setTrackAlbum(res.album.name);

        setTrackLoading(false);
      });
  }, []);

  useEffect(() => {
    const trackInfo = {
      favoritedBy: user,
      trackId: trackId,
      trackTitle: trackTitle,
      trackArtist: trackArtist,
      trackCover: trackCover,
      trackAlbum: trackAlbum,
    };
    axios.post("/api/favoriteCount", trackInfo).then((res) => {
      if (res.data.success) {
        setFavoriteCount(res.data.favoriteCount);
      } else {
        console.error("Couldn't fetch number of favorites");
      }
    });

    axios.post("/api/favorited", trackInfo).then((res) => {
      if (res.data.success) {
        setFavorited(res.data.favorited);
      } else {
        console.error("Could not get favorite info");
      }
    });
  }, []);

  return (
    <div>
      {!trackLoading ? (
        <div id="main">
          <img
            className="album-img"
            src={track.album.cover_xl}
            alt={`${track.title} cover art`}
          />
          <div id="colors" style={{ marginLeft: "20px" }}>
            <Colors />
          </div>

          <div className="track-details">
            <h1 id="title">{track.title}</h1>
            <p id="artist-name">Artist: {track.artist.name}</p>
            <br />
            <p id="album-name">Album: {track.album.title}</p>
            <br />
            <p id="date">Released: {track.album.release_date.substr(0, 4)}</p>
            <br />
            <div id="bottom-col">
              <a
                href="https://www.deezer.com/artist/4495513"
                rel="noreferrer"
                target="_blank"
                id="view-more"
              >
                See more from {track.artist.name} on Deezer®
                <img
                  id="artist-pic"
                  src={track.artist.picture}
                  alt={`${track.artist.name} icon`}
                />
              </a>
              <div className="addFav">
                <button>
                  {favorited ? "Remove 🔥" : "Add 🔥"}
                  {favoriteCount}
                </button>
              </div>
            </div>
            <audio
              id="audioPreview"
              src={track.preview}
              controls
              controlsList="nodownload noplaybackrate"
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      ) : (
        <h1 className="loading">Loading...</h1>
      )}
    </div>
  );
};
export default SongDetails;
