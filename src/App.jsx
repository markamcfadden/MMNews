import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Homepage from "./pages/Homepage";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/:article_id" element={<ArticlePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
