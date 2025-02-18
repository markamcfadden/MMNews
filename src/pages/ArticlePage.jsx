import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import SelectedArticle from "../components/Selected-Article";

function ArticlePage() {
  const { article_id } = useParams();

  return (
    <div>
      <NavBar />
      <SelectedArticle article_id={article_id} />
    </div>
  );
}

export default ArticlePage;
