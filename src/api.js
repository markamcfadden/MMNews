import axios from "axios";

const MMNews = axios.create({
  baseURL: "https://mnn-jvu9.onrender.com/api",
});

export const fetchArticles = (params) => {
  return MMNews.get("/articles", { params }).then((response) => {
    return response.data.articles;
  });
};

export const fetchArticleById = (article_id) => {
  return MMNews.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};

export const fetchCommentsByArticleId = (article_id) => {
  return MMNews.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
};

export const fetchUsers = (username) => {
  return MMNews.get("/users").then((response) => {
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
  return MMNews.patch(`/articles/${article_id}`, { inc_votes: 1 }).then(
    (response) => {
      return response.data.updatedArticle;
    }
  );
};

export const removeVote = (article_id) => {
  return MMNews.patch(`/articles/${article_id}`, { inc_votes: -1 }).then(
    (response) => {
      return response.data.updatedArticle;
    }
  );
};

export const postComment = (article_id, commentToPost) => {
  return MMNews.post(`/articles/${article_id}/comments`, commentToPost)
    .then((response) => {
      return response.data.comment;
    })
    .catch(() => {
      throw err;
    });
};

export const deleteComment = (comment_id) => {
  return MMNews.delete(`/comments/${comment_id}`).catch((err) => {
    throw err;
  });
};

export const deleteArticle = (article_id) => {
  return MMNews.delete(`/articles/${article_id}`).catch((err) => {
    throw err;
  });
};

export const fetchTopics = () => {
  return MMNews.get("/topics").then((response) => {
    return response.data.topics;
  });
};

export const postArticle = (articleToPost) => {
  console.log(articleToPost);
  return MMNews.post("/articles", articleToPost)
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      console.log("error posting article", err);
      throw err;
    });
};
