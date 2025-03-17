import { Route, Routes } from "react-router-dom";
import { UseProvider } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Homepage from "./pages/Homepage";
import ArticlePage from "./pages/ArticlePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./components/NotFound";
import UsersPage from "./pages/UsersPage";
import AddArticlePage from "./pages/AddArticlePage";
import CommunityPage from "./pages/CommunityPage";

function App() {
  return (
    <div>
      <UseProvider>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/article/:article_id" element={<ArticlePage />}></Route>
          <Route path="/search/" element={<Homepage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/community" element={<CommunityPage />}></Route>
          <Route path="/:username" element={<UsersPage />}></Route>
          <Route path="/articles/add" element={<AddArticlePage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </UseProvider>
    </div>
  );
}

export default App;
