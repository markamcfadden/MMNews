import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import { deleteArticle } from "../api";

function ArticleTrashCan({ author, article_id }) {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

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
    deleteArticle(article_id)
      .then(() => {
        setSuccessMessage("Article deleted successfully");
        setIsDeleting(false);
        navigate("/");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(() => {
        setError("Failed to delete article, please try again");
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

export default ArticleTrashCan;
