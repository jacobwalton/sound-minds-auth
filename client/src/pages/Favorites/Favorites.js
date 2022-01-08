import "./favorites.css";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../helpers/UserContext";

const Favorites = () => {
  const user = useContext(UserContext);
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  useEffect(() => {
    setFavoriteTracks(user.favorites);
  }, [user]);
  document.title = `Favorites`;

  return (
    <div>
      <ul>
        {favoriteTracks.map(function (item, key) {
          return <li key={key}>{item}</li>;
        })}
        {/* <li>{favoriteTracks[0]}</li> */}
      </ul>
    </div>
  );
};

export default Favorites;
