import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { fetchUsers } from "../api";
import NavBar from "../components/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Footer from "../components/Footer";

function LoginPage() {
  const { setLoggedInUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function setUser(e) {
    e.preventDefault();
    fetchUsers(username)
      .then((user) => {
        setError("");
        setLoggedInUser(user);
        navigate("/");
      })
      .catch(() => {
        setError("Username does not exist. Please try again.");
      });
  }

  return (
    <div>
      <NavBar />
      <div className="sign-in-container">
        <div className="sign-in-form">
          <h2>Login</h2>
          <Form onSubmit={setUser}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          {error ? <p>{error}</p> : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
