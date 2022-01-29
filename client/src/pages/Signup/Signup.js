import "./signup.css";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../helpers/UserContext";
import Colors from "../../components/Colors/Colors";
const img =
  "https://cdns.iconmonstr.com/wp-content/assets/preview/2017/240/iconmonstr-eye-9.png";

const Signup = () => {
  document.title = `Sign Up`;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const user = useContext(UserContext);

  const registerUser = (e) => {
    e.preventDefault();
    const userData = { email, username, password };
    axios
      .post("http://localhost:5000/api/signup", userData, {
        // withCredentials: true,
      })
      .then((response) => {
        user.setEmail(response.data.email);
        user.setUsername(response.data.username);
        // user.setEmail("");
        // user.setUsername("");
        window.location = "/profile";
      })
      .catch((err) => {
        if (JSON.stringify(err).includes("createError")) {
          setSignupError("User already registered with username or email");
        }

        console.log("Signup Error:", JSON.stringify(err));
      });
  };

  return (
    <div className="container">
      <div className="leftContainer">
        {/* Color palete */}
        <div className="header">
          <div className="colors">
            <Colors className="colorPalete" />
          </div>

          {/* Header */}
          <h1 className="headerText">
            SOUND
            <br />
            MINDS
          </h1>
        </div>
        <div className="aboutText">
          {/* TODO: CHANGE LOREM IPSUM TEXT TO SOMETHING ELSE!!! */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
        {/* Sign up/ log in to continue */}
        <div className="signupBar"> Signup/ Login to continue</div>
        {/* Footer text */}
        <div className="footerText">
          created by Jacob Walton 2022
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
            <p className="loginErr">{signupError}</p>
            {/* username */}
            <input
              type="text"
              value={username}
              placeholder="Username..."
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* email */}

            <input
              type="text"
              value={email}
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* password */}

            <input
              type={passwordShown ? "text" : "password"}
              value={password}
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
            />

            <img
              className="visible"
              src={img}
              id="eye"
              onClick={togglePassword}
              alt="show password icon"
            />

            <input type="submit" className="submit" value="Sign Up" />

            <div className="redirect">
              <a href="/login" style={{ textDecoration: "underline" }}>
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
