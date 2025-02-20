import { Route, Routes } from "react-router-dom";
import { UseProvider } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Homepage from "./pages/Homepage";
import ArticlePage from "./pages/ArticlePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <UseProvider>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/:query" element={<Homepage />}></Route>
          <Route path="/:article_id" element={<ArticlePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </UseProvider>
    </div>
  );
}

export default App;
