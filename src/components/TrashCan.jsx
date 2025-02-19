import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { UserContext } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import { deleteComment } from "../api";

function TrashCan({ author, comment_id }) {
  const { loggedInUser } = useContext(UserContext);
  const [canDelete, setCanDelete] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.username === author) {
        setCanDelete(true);
      }
    }
  }, [loggedInUser, author]);

  function handleDelete(e) {
    e.preventDefault();
    setError("");
    deleteComment(comment_id)
      .then(() => {
        setSuccessMessage("Comment deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(() => {
        setError("Failed to delete comment, please try again");
      });
  }

  return canDelete ? (
    <Button variant="secondary" onClick={handleDelete}>
      <Trash />
    </Button>
  ) : null;
  {
    error ? <p>{error}</p> : null;
  }
  {
    successMessage ? <p>{successMessage}</p> : null;
  }
}

export default TrashCan;
