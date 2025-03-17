import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

function NavBar() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  function handleLogout() {
    setLoggedInUser(null);
  }

  return (
    <div className="navbar">
      <div className="header-nav">
        <h1>MMNews</h1>
      </div>
      {loggedInUser ? (
        <div className="nav-user-info">
          <div className="avatar-container">
            <img src={loggedInUser.avatar_url} className="user-avatar" />
          </div>
          <div className="nav-msg-container">
            <p>Welcome {loggedInUser.username}</p>
          </div>
        </div>
      ) : null}
      <div className="navbar-home-link">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </div>

      {loggedInUser ? (
        <div className="navbar-links">
          <Link className="nav-link" to={`/community`}>
            Community
          </Link>
          <Link className="nav-link" to="/articles/add">
            Add Article
          </Link>
        </div>
      ) : (
        <div className="navbar-links"></div>
      )}

      {loggedInUser ? (
        <div className="navbar-log-in-out">
          <Link className="nav-link" to="/login">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </Link>
        </div>
      ) : (
        <div className="navbar-log-in-out">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
