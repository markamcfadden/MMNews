import ArticlesList from "../components/Article-list";
import NavBar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import { useSearchParams } from "react-router-dom";

function Homepage() {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  return (
    <div>
      <NavBar />
      <Searchbar />
      <ArticlesList params={queryParams} />
    </div>
  );
}

export default Homepage;
