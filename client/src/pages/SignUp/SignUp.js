import "./signup.css";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../helpers/UserContext";
import Colors from "../../components/Colors/Colors";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useContext(UserContext);

  const registerUser = (e) => {
    e.preventDefault();
    const userData = { email, username, password };
    axios
      .post("http://localhost:5000/api/signup", userData, {
        withCredentials: true,
      })
      .then((response) => {
        user.setEmail(response.data.email);
        user.setUsername(response.data.username);
        // user.setEmail("");
        // user.setUsername("");
        window.location = "/profile";
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
          <form
            className="signupForm"
            action=""
            onSubmit={(e) => registerUser(e)}
          >
            {/* username */}
            <input
              type="text"
              value={username}
              placeholder="Enter username..."
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* email */}
            <input
              type="text"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* password */}
            <input
              type="password"
              value={password}
              placeholder="password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" className="submit" value="Sign Up" />

            <div className="redirect">
              <a href="/login">
                Already have an account?
                <br />
                Login here!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
