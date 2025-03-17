import styled from "styled-components";
import { useState, useEffect } from "react";
import { fetchArticlesByUsername } from "../api";
import ArticleCard from "./Article-card";

function UsersArticles({ username }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticlesByUsername(username).then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  });

  return (
    <ArticlesListContainer>
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
    </ArticlesListContainer>
  );
}

export default UsersArticles;

const ArticlesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.xss};
  gap: ${({ theme }) => theme.spacing.md};
`;
