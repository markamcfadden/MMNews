import { useState, useContext } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { UserContext } from "../UserContext";
import { postVote, removeVote } from "../api";

function LikeButton({ initialLikes, article_id }) {
  const { loggedInUser } = useContext(UserContext);
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [error, setError] = useState("");

  function handleLike(e) {
    e.preventDefault();
    if (!loggedInUser) {
      setError("You must be logged in to like an article");
    } else if (hasLiked) {
      setLikes((prevLikes) => prevLikes - 1);
      removeVote(article_id)
        .then((update) => {
          setHasLiked(false);
          setLikes(update[0].votes);
        })
        .catch(() => {
          setError("Your like was not registered. Please try again");
        });
    } else {
      setLikes((prevLikes) => prevLikes + 1);
      postVote(article_id)
        .then((update) => {
          setHasLiked(true);
          setLikes(update[0].votes);
        })
        .catch(() => {
          setError("Your like was not registered. Please try again");
        });
    }
  }

  return (
    <button onClick={handleLike}>
      <FaThumbsUp /> {likes}
      {error ? <p>{error}</p> : null}
    </button>
  );
}

export default LikeButton;
