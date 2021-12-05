import "./search.css";
import { useState } from "react";

const Search = () => {
  const [results, setResults] = useState([]);

  const [searchParam, setSearchParam] = useState("");
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
            <h2>
              {searchType === "album"
                ? item.title
                : searchType === "artist"
                ? item.name
                : searchType === "track"
                ? item.name
                : item.title}
            </h2>
            <img
              src={
                searchType === "album"
                  ? item.cover
                  : searchType === ""
                  ? item.album.cover
                  : searchType === "track"
                  ? item.album.cover
                    ? item.album.cover
                    : "https://via.placeholder.com/150"
                  : searchType === "artist"
                  ? item.picture_small
                  : "https://via.placeholder.com/150"
              }
              alt="Item description"
            />
            <br />
            {searchType === "artist" || searchType === "album" ? (
              <a href={item.link}>View</a>
            ) : (
              <audio src={item.preview} controls>
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
