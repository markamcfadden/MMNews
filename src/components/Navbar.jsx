import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { UserContext } from "../UserContext";
import { useContext } from "react";

function NavBar() {
  const { loggedInUser } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="nav-container">
        <Navbar.Brand className="nav-title">Tartan Talk</Navbar.Brand>
        {loggedInUser ? (
          <div class="user-info">
            <img src={loggedInUser.avatar_url} className="nav-avatar" />
            <h4 className="nav-msg">Welcome {loggedInUser.username}</h4>
          </div>
        ) : null}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
          <Button variant="secondary" as={Link} to="/login">
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
