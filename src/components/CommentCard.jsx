import Card from "react-bootstrap/Card";
import LikeButton from "./LikeButton";
import TrashCan from "./TrashCan";

function CommentCard({
  setComments,
  comment_id,
  body,
  author,
  likes,
  created,
}) {
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
        <TrashCan
          author={author}
          comment_id={comment_id}
          setComments={setComments}
        />
      </Card.Body>
    </Card>
  );
}
export default CommentCard;
