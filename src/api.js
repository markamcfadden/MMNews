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

export const fetchUsers = (username) => {
  return tartanTalkApi.get("/users").then((response) => {
    const users = response.data.users;
    const user = users.find((user) => user.username === username);
    if (user) {
      return user;
    } else {
      throw new Error();
    }
  });
};

export const postVote = (article_id) => {
  return tartanTalkApi
    .patch(`/articles/${article_id}`, { inc_votes: 1 })
    .then((response) => {
      return response.data.updatedArticle;
    });
};

export const removeVote = (article_id) => {
  return tartanTalkApi
    .patch(`/articles/${article_id}`, { inc_votes: -1 })
    .then((response) => {
      return response.data.updatedArticle;
    });
};

export const postComment = (article_id, commentToPost) => {
  return tartanTalkApi
    .post(`/articles/${article_id}/comments`, commentToPost)
    .catch(() => {
      throw err;
    });
};
