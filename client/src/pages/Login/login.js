import "./login.css";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../helpers/UserContext";
import Colors from "../../components/Colors/Colors";

const Login = () => {
  const [username, setUsername] = useState("");
  // eslint-disable-next-line
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false);

  const user = useContext(UserContext);

  const loginUser = (e) => {
    e.preventDefault();
    const userData = { email, username, password };
    axios
      .post("http://localhost:5000/api/login", userData, {
        withCredentials: true,
      })
      .then((response) => {
        user.setEmail(response.data.email);
        user.setUsername(response.data.username);
        // user.setEmail("");
        // user.setUsername("");
        setLoginErr(false);
        window.location = "/profile";
      })
      .catch(() => {
        setLoginErr(true);
      });
  };

  return (
    <div className="container">
      <div className="leftContainer">
        {/* Color palete */}
        <div className="header">
          <Colors className="colorPalete" />
          {/* Header */}
          <h1 className="headerText">
            SOUND
            <br />
            MINDS
          </h1>
        </div>
        <div className="aboutText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
        {/* Sign up/ log in to continue */}
        <div className="signupBar"> Signup/ Login to continue</div>
        {/* Footer text */}
        <div className="footerText">
          created by Jacob Walton 2021
          <br />
          powered by DeezerAPI
        </div>
      </div>
      <div className="rightContainer">
        {/* Signup container */}
        <div className="signupContainer">
          <form className="signupForm" action="" onSubmit={(e) => loginUser(e)}>
            {/* username */}
            {loginErr && (
              <p className="loginErr">Username or password is incorrect</p>
            )}
            <input
              type="text"
              value={username}
              placeholder="Enter username..."
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* password */}
            <input
              type="password"
              value={password}
              placeholder="password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" className="submit" value="Log In" />

            <div className="redirect">
              <a href="/">
                Don't have an account yet?
                <br />
                Sign up here!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
