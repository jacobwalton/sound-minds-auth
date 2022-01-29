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
  // const [favorited, setFavorited] = useState(false);
  let favorited = false;

  // const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    fetch(
      `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${trackId}`
    )
      .then((res) => res.json())
      .then((res) => {
        setTrack(res);
        setTrackTitle(res.title);
        setTrackArtist(res.artist.name);
        setTrackCover(res.album.cover_xl);
        setTrackAlbum(res.album.title);
        document.title = `${res.title} - ${res.artist.name}`;
        setTrackLoading(false);
      });
  }, [trackId]);
  const trackInfo = {
    favoritedBy: user.username,
    trackId: trackId,
    trackTitle: trackTitle,
    trackArtist: trackArtist,
    trackCover: trackCover,
    trackAlbum: trackAlbum,
  };

  for (let i = 0; i < user.favorites.length; i++) {
    if (user.favorites[i].trackId === trackId) {
      favorited = true;
    }
  }

  // Create state for comments
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const commentInfo = {
    content: comment,
    commentBy: user.username,
    trackId: trackId,
  };

  // useEffect to get all commnets where trackId matches
  useEffect(() => {
    fetch(`http://localhost:5000/api/getComments`)
      .then((res) => res.json())
      .then((res) => {
        console.log("RES!!!!", res);
        // setTrack(res);
        // setTrackTitle(res.title);
        // setTrackArtist(res.artist.name);
        // setTrackCover(res.album.cover_xl);
        // setTrackAlbum(res.album.title);
        // document.title = `${res.title} - ${res.artist.name}`;
        // setTrackLoading(false);
      });
  }, []);

  // handleChange func for adding new comments
  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };
  // onSubmit func to post new comments
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/addComment", commentInfo)
      .then((res) => {
        if (res.data.success) {
          window.location.reload();
        } else {
          console.error("Something went wrong, couldn't add new comment");
        }
      });
  };

  const toggleFavorite = () => {
    //Removing favorite
    let arr = user.favorites;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].trackId === trackId) {
        axios.post("http://localhost:5000/api/removeFavorite", trackInfo);

        window.location.reload();
        return;
      }
    }

    //Adding favorite
    axios.post("http://localhost:5000/api/addFavorite", trackInfo);

    window.location.reload();
  };
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
                <button onClick={toggleFavorite}>
                  {favorited ? "Remove 🔥" : "Add 🔥"}
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
      {/* COMMENT SECTION */}
      <div className="commentSection">
        <h2 id="commentHeader">Sound Off!</h2>

        <form id="newComment" onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            id="commentText"
            placeholder={`What do you think?`}
            value={comment}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default SongDetails;
