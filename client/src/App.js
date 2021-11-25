import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Search from "./pages/Search/Search";
import UserContext from "./helpers/UserContext";
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
  return (
    <UserContext.Provider value={{ username, setUsername, email, setEmail }}>
      <BrowserRouter>
        {/* testing auth */}
        {/* <div>
          {!!username && <h3>Logged in as {username}</h3>}
          {!username && <h4>Not signed in</h4>}
        </div> */}

        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
