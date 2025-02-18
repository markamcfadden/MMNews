import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);

  function handleLike(e) {
    e.preventDefault();
    setLikes((prevLikes) => prevLikes + 1);
  }

  return (
    <button onClick={handleLike}>
      <FaThumbsUp /> {likes}
    </button>
  );
}

export default LikeButton;
