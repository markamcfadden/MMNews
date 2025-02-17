import { useState, useEffect } from "react";

import ArticleCard from "./Article-card";
import { fetchArticles } from "../api";

function ArticlesList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
      })
      .catch((err) => {
        console.log("we have an error");
      });
  }, []);

  return (
    <div className="grid-container">
      {articles.map((article) => (
        <ArticleCard
          key={article.article_id}
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
