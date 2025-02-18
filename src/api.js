import axios from "axios";

const tartanTalkApi = axios.create({
  baseURL: "https://mnn-jvu9.onrender.com/api",
});

export const fetchArticles = () => {
  return tartanTalkApi.get("/articles").then((response) => {
    return response.data.articles;
  });
};

export const fetchArticleById = (article_id) => {
  return tartanTalkApi.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};

export const fetchCommentsByArticleId = (article_id) => {
  return tartanTalkApi
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    });
};
