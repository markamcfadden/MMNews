import Card from "react-bootstrap/Card";
import LikeButton from "./LikeButton";

function CommentCard({ body, author, likes, created }) {
  return (
    <Card style={{ width: "18rem" }} className="article-card">
      <Card.Body>
        <Card.Text>
          <small>{body}</small>
          <br />
          <small>Author: {author}</small>
          <br />
          <small>{created}</small>
        </Card.Text>
        <LikeButton initialLikes={likes} />
      </Card.Body>
    </Card>
  );
}
export default CommentCard;
