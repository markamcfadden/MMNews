import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUserByUsername } from "../api";
import UserCard from "../components/UsersCard";
import UsersArticles from "../components/UsersArticles";

function UsersPage() {
  const { username } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUserByUsername(username).then((userFromApi) => {
      setUser(userFromApi);
    });
  }, []);

  console.log(">>>>>>", user);

  return (
    <PageContainer>
      <NavBar />
      <UserCard username={user.username} avatar_url={user.avatar_url} />
      <UsersArticles username={user.username} />
      <Footer />
    </PageContainer>
  );
}

export default UsersPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;
