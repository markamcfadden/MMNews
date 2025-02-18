import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Tartan Talk</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
          <Button variant="secondary">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
