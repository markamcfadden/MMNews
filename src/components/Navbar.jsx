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
    <Navbar expand={false} className="navbar">
      <Container className="nav-cont">
        <Navbar.Brand>TARTAN TALK</Navbar.Brand>
        <div className="nav-user-info-container">
          {loggedInUser ? (
            <div className="nav-user-info">
              <div className="nav-avatar-container">
                <img src={loggedInUser.avatar_url} className="nav-avatar" />{" "}
              </div>
              <h4 className="nav-msg">Welcome {loggedInUser.username}</h4>
            </div>
          ) : null}
        </div>
      </Container>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link className="home-link" as={Link} to="/">
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
    </Navbar>
  );
}

export default NavBar;
