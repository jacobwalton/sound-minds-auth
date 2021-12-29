import { useEffect, useState } from "react";
import Colors from "../../components/Colors/Colors";
import "./song-details.css";

const SongDetails = (props) => {
  const [trackLoading, setTrackLoading] = useState(true);
  let trackId = props.match.params.trackId;
  const [track, setTrack] = useState([]);
  useEffect(() => {
    fetch(
      `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${trackId}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTrack(res);
        console.log("Track: ", track);
        setTrackLoading(false);
      });
  }, [track, trackId]);

  return (
    <div>
      {!trackLoading ? (
        <div id="main">
          <img
            className="album-img"
            src={track.album.cover_xl}
            alt={`${track.title} cover art`}
          />
          <div id="colors">
            <Colors />
          </div>

          <div className="track-details">
            <h1 id="title">{track.title}</h1>
            <p id="artist-name">{track.artist.name}</p>
            <br />
            <p id="album-name">{track.album.title}</p>
            <br />
            <p id="date">{track.album.release_date.substr(0, 4)}</p>
            <br />
            <a
              href="https://www.deezer.com/artist/4495513"
              rel="noreferrer"
              target="_blank"
              id="view-more"
            >
              See more from {track.artist.name}
              <img
                id="artist-pic"
                src={track.artist.picture}
                alt={`${track.artist.name} icon`}
              />
            </a>

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
