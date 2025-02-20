import { useState, useEffect } from "react";
import ArticleCard from "./Article-card";
import { fetchArticles } from "../api";
import Spinner from "react-bootstrap/Spinner";

function ArticlesList({ query }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles(query)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles. Please try again");
        setIsLoading(false);
      });
  }, [query]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid-container">
      {articles.map((article) => (
        <ArticleCard
          key={article.article_id}
          article_id={article.article_id}
          title={article.title}
          author={article.author}
          created={new Date(article.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          likes={article.votes}
          image={article.article_img_url}
          comment_count={article.comment_count}
        />
      ))}
    </div>
  );
}

export default ArticlesList;
