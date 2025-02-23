import ArticlesList from "../components/Article-list";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import { useSearchParams } from "react-router-dom";

function Homepage() {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  return (
    <div>
      <NavBar />
      <div className="homepage-main">
        <div className="homepage-search">
          <Searchbar />
        </div>
        <div className="homepage-list">
          <ArticlesList params={queryParams} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
