import ArticlesList from "../components/Article-list";
import NavBar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

function Homepage() {
  return (
    <div>
      <NavBar />
      <Searchbar />
      <ArticlesList />
    </div>
  );
}

export default Homepage;
