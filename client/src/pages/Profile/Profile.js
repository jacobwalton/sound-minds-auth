import "./profile.css";
import { useContext } from "react";
import UserContext from "../../helpers/UserContext";
import Colors from "../../components/Colors/Colors";

const Profile = () => {
  const user = useContext(UserContext);
  document.title = `${user.username}'s Profile`;

  return (
    <div className="profileContainer">
      <div className="header">
        <div id="colors">
          <Colors />
        </div>

        <h1>{user.username}</h1>
      </div>
      <div className="userDetails">
        <ul className="detailList">
          <li>
            Email Address: <span className="userInfo">{user.email}</span>
          </li>
          <li>Member since: </li>
          <li>Number of comments: </li>
          <li>Number of favorites: {user.favorites.length}</li>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default Profile;
