import "./profile.css";
import { useContext } from "react";
import UserContext from "../../helpers/UserContext";
import Colors from "../../components/Colors/Colors";

const Profile = () => {
  const user = useContext(UserContext);
  return (
    <div className="profileContainer">
      <div className="header">
        <Colors />

        <h1>{user.username}</h1>
      </div>
      <div className="userDetails">
        <ul className="detailList">
          <li>Member since: </li>
          <li>Number of comments: </li>
          <li>Number of favorites: </li>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default Profile;
