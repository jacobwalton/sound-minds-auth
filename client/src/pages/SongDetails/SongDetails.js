import { useEffect } from "react";
import "./song-details.css";

const SongDetails = () => {
  let trackId = "1";
  useEffect(() => {
    fetch(
      `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${trackId}`
    );
  }, []);

  return <div></div>;
};
export default SongDetails;
