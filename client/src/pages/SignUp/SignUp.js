import "./sign-up.css";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      Sign Up
      <form>
        {/* username */}
        <input
          type="text"
          value={username}
          placeholder="username..."
          onChage={(e) => setUsername(e.target.value)}
        />
        {/* email */}
        <input
          type="text"
          value={email}
          placeholder="email"
          onChage={(e) => setEmail(e.target.value)}
        />
        {/* password */}
        <input
          type="password"
          value={password}
          placeholder="password..."
          onChage={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
