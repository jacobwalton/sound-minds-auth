import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
  createRoutesFromChildren,
} from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Search from "./pages/Search/Search";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
