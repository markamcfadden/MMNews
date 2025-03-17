import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUserByUsername } from "../api";
import UserCard from "../components/UsersCard";
import UsersArticles from "../components/UsersArticles";

function UsersPage() {
  const { username } = useParams();
  console.log(username);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUserByUsername(username).then((userFromApi) => {
      setUser(userFromApi);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <UserCard username={user.username} avatar_url={user.avatar_url} />
      <UsersArticles username={user.username} />
      <Footer />
    </div>
  );
}

export default UsersPage;
