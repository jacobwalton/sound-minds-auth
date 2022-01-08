import "./favorites.css";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../helpers/UserContext";

const Favorites = () => {
  const user = useContext(UserContext);
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  useEffect(() => {
    setFavoriteTracks(user.favorites);
  }, [user]);
  const [message, setMessage] = useState("No Favorites");
  document.title = `Favorites`;

  return (
    <div>
      <div className="results">
        {/* Search Results */}
        {favoriteTracks.length > 0 ? (
          favoriteTracks.map((item, key) => (
            <div
              key={item.trackId}
              className="result"
              // style={{
              //   backgroundImage: `url(${item.artist.picture_xl})`,
              // }}
              trackId={item.trackId}
            >
              <a href={`/track/${item.trackId}`}>
                <img
                  style={{ width: "150px" }}
                  src={item.trackCover}
                  alt={`${item.trackTitle} cover art`}
                  className="coverArt"
                />
              </a>
              <div>
                <h4 className="title">{item.trackTitle}</h4>
                <div className="details">
                  <p>Artist: {item.trackArtist}</p>

                  <br />
                </div>
              </div>
              <br />
              {/* <audio
                className="audioPreview"
                src={item.preview}
                controls
                controlsList="nodownload noplaybackrate"
              >
                Your browser does not support the audio element.
              </audio> */}
            </div>
          ))
        ) : (
          <h1 className="noSearch">{message}</h1>
        )}
      </div>
    </div>
  );
};

export default Favorites;
