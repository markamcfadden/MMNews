import { useState, useEffect } from "react";
import { fetchArticleById, fetchCommentsByArticleId } from "../api";
import Spinner from "react-bootstrap/Spinner";
import ArticleCard from "./Article-card";
import CommentCard from "./CommentCard";
import Button from "react-bootstrap/Button";

function SelectedArticle({ article_id }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((articleFromApi) => {
        setSelectedArticle(articleFromApi);
        setIsArticleLoading(false);
      })
      .catch((err) => {
        setError("Failed to load article, please try again");
        setIsArticleLoading(false);
      });
  }, [article_id]);

  function showHideComments() {
    if (!showComments) {
      setShowComments(true);
      setIsCommentsLoading(true);

      return fetchCommentsByArticleId(article_id)
        .then((commentsFromApi) => {
          setComments(commentsFromApi);
          setIsCommentsLoading(false);
        })
        .catch(() => {
          setError("Failed to load comments, please try agin");
        });
    }
    setShowComments(false);
  }

  if (isArticleLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ArticleCard
        article_id={selectedArticle.article_id}
        title={selectedArticle.title}
        author={selectedArticle.author}
        created={new Date(selectedArticle.created_at).toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        )}
        likes={selectedArticle.votes}
        image={selectedArticle.article_img_url}
        comment_count={selectedArticle.comment_count}
        body={selectedArticle.body}
      />
      <Button variant="secondary" onClick={showHideComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </Button>

      {showComments ? (
        <div>
          {isCommentsLoading ? (
            <Spinner />
          ) : (
            comments.map((comment) => (
              <CommentCard
                key={comment.comment_id}
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

export default SelectedArticle;
