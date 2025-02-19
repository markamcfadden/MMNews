import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import SelectedArticle from "../components/Selected-Article";
import CommentsList from "../components/CommentsList";
import AddComment from "../components/AddComment";

function ArticlePage() {
  const { article_id } = useParams();

  return (
    <div>
      <NavBar />
      <SelectedArticle article_id={article_id} />
      <AddComment article_id={article_id} />
      <CommentsList article_id={article_id} />
    </div>
  );
}

export default ArticlePage;
