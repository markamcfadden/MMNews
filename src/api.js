import axios from "axios";

const tartanTalkApi = axios.create({
  baseURL: "https://mnn-jvu9.onrender.com/api",
});

export const fetchArticles = () => {
  return tartanTalkApi.get("/articles").then((response) => {
    return response.data.articles;
  });
};
