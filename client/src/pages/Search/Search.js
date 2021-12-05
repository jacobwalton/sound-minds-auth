import "./search.css";

const Search = () => {
  return (
    <div className="searchContainer">
      <input
        id="search"
        type="text"
        placeholder="Search for tracks, artists, or album..."
        name="search"
      />
    </div>
  );
};

export default Search;
