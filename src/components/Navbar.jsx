import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import styled from "styled-components";

function NavBar() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  function handleLogout() {
    setLoggedInUser(null);
  }

  return (
    <NavbarContainer>
      <Title>MMNews</Title>

      {loggedInUser && (
        <UserInfo>
          <WelcomeMessage>Welcome, {loggedInUser.username}</WelcomeMessage>
        </UserInfo>
      )}

      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        {loggedInUser && <StyledLink to="/community">Community</StyledLink>}
        {loggedInUser && (
          <StyledLink to="/articles/add">Add Article</StyledLink>
        )}
        {loggedInUser ? (
          <StyledLink onClick={handleLogout}>Logout</StyledLink>
        ) : (
          <StyledLink to="/login">Login</StyledLink>
        )}
      </NavLinks>
    </NavbarContainer>
  );
}

export default NavBar;

const NavbarContainer = styled.nav`
  background: #1e3a8a;
  color: white;
  text-align: center;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const WelcomeMessage = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

const NavLinks = styled.div`
  padding-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 6px;
  transition: 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
