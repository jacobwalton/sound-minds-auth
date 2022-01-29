import "./search.css";
import { useState } from "react";

const Search = () => {
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("Sound Off!");

  const [searchParam, setSearchParam] = useState("");

  const baseUrl = `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search/?q=${searchParam.replace(
    / /g,
    "%20"
  )}`;

  const handleChange = (e) => {
    setSearchParam(e.target.value);
    document.title = `Search: ${searchParam}`;
  };

  const fetchData = () => {
    if (searchParam.length === 0) {
      setSearchParam("Search");
    }
    // console.log(baseUrl);
    // `https://api.allorigins.win/get?url=${encodeURIComponent(baseUrl)}`);
    return fetch(baseUrl, { mode: "no-cors" })
      .then((res) => res.json())
      .then((data) => setResults(data.data))
      .catch((err) => console.log("ERROR: ", err));
  };

  const handleSearch = (e) => {
    document.title = `Search: ${searchParam}`;
    e.preventDefault();
    setMessage("Loading...");
    fetchData();
  };

  return (
    <div className="searchContainer">
      <form onSubmit={handleSearch}>
        <div className="searchSection">
          <input
            id="search"
            type="text"
            placeholder="Search for tracks, artists, or album..."
            name="search"
            onChange={handleChange}
          />
          <button className="searchBtn" type="submit">
            Search
          </button>
        </div>
      </form>

      <div className="results">
        {/* Search Results */}
        {results.length > 0 ? (
          results.map((item, key) => (
            <div
              key={item.id}
              className="result"
              // style={{
              //   backgroundImage: `url(${item.artist.picture_xl})`,
              // }}
              trackId={item.id}
            >
              <a href={`/track/${item.id}`}>
                <img
                  src={item.album.cover_xl}
                  onMouseOver={(e) =>
                    (e.currentTarget.src = item.artist.picture_xl)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.src = item.album.cover_xl)
                  }
                  alt={`${item.title} cover art`}
                  className="coverArt"
                />
              </a>
              <div>
                <h4 className="title">{item.title}</h4>
                <div className="details">
                  <p>Artist: {item.artist.name}</p>
                  <p>Album: {item.album.title}</p>
                  {item.explicit_lyrics === true ? (
                    <em className="lyrics">Lyrics: Explit</em>
                  ) : (
                    <em className="lyrics">Lyrics: Clean</em>
                  )}
                  <br />

                  <p>
                    <a className="link" href={item.link}>
                      View on Deezer®
                    </a>
                  </p>
                </div>
              </div>
              <br />
              <audio
                className="audioPreview"
                src={item.preview}
                controls
                controlsList="nodownload noplaybackrate"
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        ) : (
          <h1 className="noSearch">{message}</h1>
        )}
      </div>
    </div>
  );
};

export default Search;
