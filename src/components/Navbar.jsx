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
  background: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.small};
  border-radius: 2%;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const WelcomeMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const NavLinks = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: ${({ theme }) => theme.transitions.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.accent.hover};
    color: ${({ theme }) => theme.colors.text.light};
  }
`;
