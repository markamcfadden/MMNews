import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import LikeButton from "./LikeButton";

function ArticleCard({
  article_id,
  title,
  author,
  created,
  likes,
  image,
  body,
}) {
  return (
    <Link to={`/${article_id}`} className="article-card-link">
      <Card className="article-card">
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            Author: {author}
            <br />
            {created}
            <br />
          </Card.Text>
          <Card.Text className="article-body">{body ? body : null}</Card.Text>
          <div>
            <LikeButton initialLikes={likes} article_id={article_id} />
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ArticleCard;
