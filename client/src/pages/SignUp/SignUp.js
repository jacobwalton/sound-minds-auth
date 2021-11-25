import "./sign-up.css";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../helpers/UserContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useContext(UserContext);

  const registerUser = (e) => {
    e.preventDefault();

    console.log(user);
    const userData = { username, email, password };
    axios
      .post("http://localhost:5000/api/signup", userData, {
        withCredentials: true,
      })
      .then((response) => {
        user.setEmail(response.data.email);
        user.setUsername(response.data.username);
      });
  };

  return (
    <div>
      <hr />
      Sign Up
      <form action="" onSubmit={(e) => registerUser(e)}>
        {/* username */}
        <input
          type="text"
          value={username}
          placeholder="username..."
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
