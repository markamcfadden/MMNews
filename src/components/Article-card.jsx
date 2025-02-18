import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import LikeButton from "./LikeButton";
import CommentCount from "./Comment-count";

function ArticleCard({
  article_id,
  title,
  author,
  created,
  likes,
  image,
  comment_count,
  body,
}) {
  return (
    <Link to={`/${article_id}`} className="article-card-link">
      <Card style={{ width: "18rem" }} className="article-card">
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <small>Author: {author}</small>
            <br />
            <small>{created}</small>
            <br />
            {body ? <small>{body}</small> : null}
          </Card.Text>
          <div>
            <LikeButton initialLikes={likes} />
            <CommentCount commentCount={comment_count} />
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ArticleCard;
