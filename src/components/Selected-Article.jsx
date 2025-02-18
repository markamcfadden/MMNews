import { useState, useEffect } from "react";
import { fetchArticleById, fetchCommentsByArticleId } from "../api";
import Spinner from "react-bootstrap/Spinner";
import ArticleCard from "./Article-card";
import CommentCard from "./CommentCard";

function SelectedArticle({ article_id }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((articleFromApi) => {
        setSelectedArticle(articleFromApi);
        return fetchCommentsByArticleId(article_id);
      })
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load article, please try again");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
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
      <div>
        {comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            body={comment.body}
            author={comment.author}
            likes={comment.votes}
            created={new Date(comment.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectedArticle;
