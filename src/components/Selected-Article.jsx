import { useState, useEffect } from "react";
import { fetchArticleById } from "../api";
import Spinner from "react-bootstrap/Spinner";
import ArticleCard from "./Article-card";

function SelectedArticle({ article_id, setErrorCode, setErrorMessage }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isArticleLoading, setIsArticleLoading] = useState(true);

  useEffect(() => {
    setIsArticleLoading(true);
    fetchArticleById(article_id)
      .then((articleFromApi) => {
        setSelectedArticle(articleFromApi);
        setIsArticleLoading(false);
      })
      .catch((err) => {
        setErrorCode(err.response.status);
        setErrorMessage(err.response.data.msg);
        setIsArticleLoading(false);
      });
  }, [article_id]);

  if (isArticleLoading) {
    return <Spinner />;
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
    </div>
  );
}

export default SelectedArticle;
