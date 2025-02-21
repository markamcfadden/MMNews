import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { postComment } from "../api";

function AddComment({ article_id, setComments }) {
  const { loggedInUser } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleCancel() {
    setComment("");
    setIsExpanded(false);
    setError("");
    setSuccessMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    if (!loggedInUser) {
      setError("You must be logged in to comment on an article");
      setIsSubmitting(false);
      return;
    }
    const commentToPost = { username: loggedInUser.username, body: comment };

    postComment(article_id, commentToPost)
      .then((newComment) => {
        setComment("");
        setIsExpanded(false);
        setSuccessMessage("Comment posted successfully");
        setIsSubmitting(false);

        setComments((prev) => [newComment, ...prev]);

        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(() => {
        setError("Failed to post comment. Please try again");
        setIsSubmitting(false);
      });
  }

  return (
    <Form className="comment-box">
      <InputGroup>
        <Form.Control
          as="textarea"
          rows={isExpanded ? 3 : 1}
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onFocus={() => setIsExpanded(true)}
        />
      </InputGroup>
      {error ? <p>{error}</p> : null}
      {successMessage ? <p>{successMessage}</p> : null}

      {isExpanded && (
        <div>
          <Button
            variant="secondary"
            type="submit"
            onClick={handleSubmit}
            disabled={comment.length < 1 || isSubmitting}
          >
            Comment
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}
    </Form>
  );
}

export default AddComment;
