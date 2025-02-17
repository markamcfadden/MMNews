import ArticlesList from "../components/Article-list";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

function Homepage() {
  return (
    <div>
      <Navbar />
      <Searchbar />
      <ArticlesList />
    </div>
  );
}

export default Homepage;
