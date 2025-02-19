import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { UserContext } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import { deleteComment } from "../api";

function TrashCan({ author, comment_id, setComments }) {
  const { loggedInUser } = useContext(UserContext);
  const [canDelete, setCanDelete] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsDeleting(true);
    deleteComment(comment_id)
      .then(() => {
        setSuccessMessage("Comment deleted successfully");
        setIsDeleting(false);
        setComments((prev) =>
          prev.filter((comment) => comment.comment_id !== comment_id)
        );
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(() => {
        setError("Failed to delete comment, please try again");
        setIsDeleting(false);
      });
  }

  return canDelete ? (
    <div>
      <Button variant="secondary" onClick={handleDelete} disabled={isDeleting}>
        <Trash />
      </Button>
      {error ? <p>{error}</p> : null}{" "}
      {successMessage ? <p>{successMessage}</p> : null}
    </div>
  ) : null;
}

export default TrashCan;
