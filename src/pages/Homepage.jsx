import ArticlesList from "../components/Article-list";
import NavBar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import { useParams } from "react-router-dom";

function Homepage() {
  const { selectedTopic } = useParams();

  return (
    <div>
      <NavBar />
      <Searchbar />
      <ArticlesList topic={selectedTopic} />
    </div>
  );
}

export default Homepage;
