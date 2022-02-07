import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Login from "../src/pages/Login/Login";
import Signup from "../src/pages/Signup/Signup";
import Search from "../src/pages/Search/Search";
import Favorites from "../src/pages/Favorites/Favorites";
import Profile from "../src/pages/Profile/Profile";
import SongDetails from "../src/pages/SongDetails/SongDetails";
// eslint-disable-next-line
import Nav from "./components/Nav/Nav";
import UserContext from "./helpers/UserContext";
// eslint-disable-next-line
import star from "./assets/star_icon.png";
import logoutImg from "./assets/logout_icon.png";
import search from "./assets/search_icon.png";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
        "Access-Control-Allow-Credentials": true,
      })
      .then((res) => {
        // res.header("Access-Control-Allow-Credentials", true);
        setEmail(res.data.email);
        setUsername(res.data.username);
        setFavorites(res.data.favorites);
        setCreatedAt(res.data.createdAt);
      });
  }, []);

  const logout = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/logout",
        {},
        { credentials: "same-origin" }
      )
      .then(() => {
        setEmail("");
      });

    window.location = "/";
  };
  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        favorites,
        setFavorites,
        createdAt,
        setCreatedAt,
      }}
    >
      <BrowserRouter>
        {/* {username && ( */}
        <div>
          <div className="nav">
            {" "}
            <Link to="/search">
              <div className="search-nav">
                {" "}
                <img
                  className="icon search-icon"
                  src={search}
                  alt="search icon"
                />
              </div>
            </Link>
            <Link to="/profile">
              <div className="profile-nav">
                <div className="circle">
                  {username.substr(0, 1).toUpperCase()}
                </div>
              </div>
            </Link>
            <Link to="/favorites">
              <div className="favorites-nav">
                🔥
                {/* <img
                  className="icon fav-icon"
                  src={star}
                  alt="favorites icon"
                /> */}
              </div>
            </Link>
            <Link to="" onClick={(e) => logout(e)}>
              <div className="logout-nav">
                {" "}
                <img
                  className="icon logout-icon"
                  src={logoutImg}
                  alt="logout icon"
                />
              </div>
            </Link>
          </div>
        </div>
        {/* )} */}

        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/track/:trackId" component={SongDetails} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
