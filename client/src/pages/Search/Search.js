import "./search.css";
import UserContext from "../../helpers/UserContext";
import { useState } from "react";

const Search = () => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();

  return (
    <UserContext.Provider value={{ username, setUsername, email, setEmail }}>
      {email && username ? <div>SEARCH PAGE</div> : <div>Go awaay</div>}
      {/* <div>SEARCH PAGE</div> */}
    </UserContext.Provider>
  );
};

export default Search;
