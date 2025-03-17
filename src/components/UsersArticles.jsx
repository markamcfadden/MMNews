import styled from "styled-components";
import { useState, useEffect } from "react";
import { fetchArticlesByUsername } from "../api";

function UsersArticles({ username }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticlesByUsername(username).then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  });

  return <p>{username}'s articles</p>;
}

export default UsersArticles;
