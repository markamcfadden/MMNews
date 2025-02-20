import { Link } from "react-router-dom";

function ErrorComponent({ errorCode, errorMessage }) {
  return (
    <div>
      <h1>{errorCode}</h1>
      <p>{errorMessage}</p>
      <Link to="/">Return to HomePage</Link>
    </div>
  );
}

export default ErrorComponent;
