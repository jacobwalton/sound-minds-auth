import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Search from "./pages/Search/Search";
import UserContext from "./helpers/UserContext";
import { useState, useContext } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const newUser = useContext(UserContext);
  return (
    <UserContext.Provider value={{ username, setUsername, email, setEmail }}>
      <div>
        {!!username && <h3>Logged in as {username}</h3>}
        {!username && <h4>Not signed in</h4>}
      </div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
