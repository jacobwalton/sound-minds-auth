import "./search.css";
import { useState } from "react";

const Search = () => {
  const [results, setResults] = useState([]);

  const [searchParam, setSearchParam] = useState("");

  // const proxyurl = "https://corsanywhere.herokuapp.com/";

  const baseUrl = `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search/?q=${searchParam.replace(
    / /g,
    "%20"
  )}`;

  const handleChange = (e) => {
    setSearchParam(e.target.value);
  };

  const fetchData = () => {
    // console.log(baseUrl);
    // `https://api.allorigins.win/get?url=${encodeURIComponent(baseUrl)}`);
    return fetch(baseUrl, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": null,
        "X-Requested-With": null,
      },
    })
      .then((res) => res.json())
      .then((data) => setResults(data.data))
      .catch((err) => console.log("ERROR: ", err));
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
        {results.length > 0 ? (
          results.map((item, key) => (
            <div
              key={key}
              className="result"
              // style={{
              //   backgroundImage: `url(${item.artist.picture_xl})`,
              // }}
            >
              <img
                src={item.album.cover_xl}
                onMouseOver={(e) =>
                  (e.currentTarget.src = item.artist.picture_xl)
                }
                onMouseOut={(e) => (e.currentTarget.src = item.album.cover_xl)}
                alt={`${item.title} cover art`}
                className="coverArt"
              />
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
          ))
        ) : (
          <h1 className="noSearch">Sound Off!</h1>
        )}
      </div>
    </div>
  );
};

export default Search;
