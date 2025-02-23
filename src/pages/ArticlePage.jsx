import { useParams } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/Navbar";
import SelectedArticle from "../components/Selected-Article";
import CommentsList from "../components/CommentsList";
import ErrorComponent from "../components/ErrorComponent";
import Footer from "../components/Footer";

function ArticlePage() {
  const { article_id } = useParams();
  const [errorCode, setErrorCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      <NavBar />
      <div className="article-page">
        {!errorCode && !errorMessage ? (
          <div>
            <SelectedArticle
              article_id={article_id}
              setErrorCode={setErrorCode}
              setErrorMessage={setErrorMessage}
            />
            <CommentsList article_id={article_id} />
          </div>
        ) : (
          <ErrorComponent errorCode={errorCode} errorMessage={errorMessage} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ArticlePage;
