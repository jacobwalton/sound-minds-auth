import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import Favorites from "./pages/Favorites/Favorites";
import Profile from "./pages/Profile/Profile";
// eslint-disable-next-line
import Nav from "./components/Nav/Nav";
import UserContext from "./helpers/UserContext";
import star from "./assets/star_icon.png";
import logoutImg from "./assets/logout_icon.png";
import search from "./assets/search_icon.png";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user", { withCredentials: true })
      .then((res) => {
        setEmail(res.data.email);
        setUsername(res.data.username);
      });
  }, []);

  const logout = () => {
    axios
      .post("http://localhost:5000/api/logout", {}, { withCredentials: true })
      .then(() => {
        setEmail("");
      });

    window.location = "/";
  };
  return (
    <UserContext.Provider value={{ username, setUsername, email, setEmail }}>
      <BrowserRouter>
        <div className="nav">
          {username && (
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
                  <img
                    className="icon fav-icon"
                    src={star}
                    alt="favorites icon"
                  />
                </div>
              </Link>
              <Link to="" onClick={() => logout()}>
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
          )}
        </div>

        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
