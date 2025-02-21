import { useState } from "react";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { fetchCommentsByArticleId } from "../api";

function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState("");

  function showHideComments() {
    if (showComments) {
      setShowComments(false);
      return;
    }

    setShowComments(true);
    setIsLoading(true);
    setError("");

    fetchCommentsByArticleId(article_id)
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError("Failed to load comments, please try again");
      });
  }

  return (
    <div>
      <AddComment article_id={article_id} setComments={setComments} />
      <Button variant="secondary" onClick={showHideComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </Button>

      {error ? <p>{error}</p> : null}

      {showComments ? (
        <div className="grid-container">
          {isLoading ? (
            <Spinner />
          ) : (
            comments.map((comment) => (
              <CommentCard
                key={comment.comment_id}
                setComments={setComments}
                comment_id={comment.comment_id}
                body={comment.body}
                author={comment.author}
                likes={comment.votes}
                created={new Date(comment.created_at).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              />
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

export default CommentsList;
