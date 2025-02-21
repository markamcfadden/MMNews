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
    <Card className="comment-card">
      <Card.Body>
        <Card.Text className="comment-body">{body}</Card.Text>
        <div className="article-meta">
          <div className="meta-box">{author}</div>
          <div className="meta-box"> {created}</div>
          <div className="meta-box">
            <LikeButton initialLikes={likes} />
          </div>
          <div className="meta-box">
            <TrashCan
              author={author}
              comment_id={comment_id}
              setComments={setComments}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export default CommentCard;
