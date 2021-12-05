import "./search.css";
import { useState } from "react";

const Search = () => {
  const [results, setResults] = useState([]);

  const [searchParam, setSearchParam] = useState("");
  // eslint-disable-next-line
  const [searchType, setSearchType] = useState("");
  const proxyurl = "https://corsanywhere.herokuapp.com/";

  const baseUrl = `https://api.deezer.com/search/?q=${searchParam.replace(
    / /g,
    "%20"
  )}`;

  const handleChange = (e) => {
    setSearchParam(e.target.value);
  };

  const fetchData = () => {
    // console.log(baseUrl);
    return (
      fetch(proxyurl + baseUrl, {
        mode: "cors",
        method: "GET",
        "Access-Control-Allow-Origin": "*",
      })
        .then((res) => res.json())
        // .then((data) => console.log(data.data));
        .then((data) => setResults(data.data))
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
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
        {results.map((item, key) => (
          <div key={key} className="result">
            <img
              src={
                searchType === "album"
                  ? item.cover
                  : searchType === ""
                  ? item.album.cover_xl
                  : searchType === "track"
                  ? item.album.cover
                    ? item.album.cover_xl
                    : "https://via.placeholder.com/150"
                  : searchType === "artist"
                  ? item.picture_small
                  : "https://via.placeholder.com/150"
              }
              onMouseOver={(e) =>
                (e.currentTarget.src = item.artist.picture_xl)
              }
              onMouseOut={(e) => (e.currentTarget.src = item.album.cover_xl)}
              alt={`${item.title} cover art`}
              className="coverArt"
            />
            <h4 className="title">
              {searchType === "album"
                ? item.title
                : searchType === "artist"
                ? item.name
                : searchType === "track"
                ? item.name
                : item.title}
            </h4>
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
                  View
                </a>
              </p>
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
        ))}
      </div>
    </div>
  );
};

export default Search;
