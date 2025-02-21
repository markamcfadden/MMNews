import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { UserContext } from "../UserContext";
import { useContext } from "react";

function NavBar() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  function handleLogout() {
    setLoggedInUser(null);
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top navbar">
      <Container>
        <Navbar.Brand className="mx-auto ">TARTAN TALK</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
          <Nav>
            {loggedInUser ? (
              <Link to="/login">
                <Button variant="secondary" onClick={handleLogout}>
                  LogOut
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="nav-user-info-container">
        {loggedInUser ? (
          <div className="nav-user-info">
            <img src={loggedInUser.avatar_url} className="nav-avatar" />
            <h4 className="nav-msg">Welcome {loggedInUser.username}</h4>
          </div>
        ) : null}
      </div>
    </Navbar>
  );
}

export default NavBar;
