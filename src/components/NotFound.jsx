import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>404: Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn't exist</p>
      <Link to="/">Return to HomePage</Link>
    </div>
  );
}

export default NotFound;
