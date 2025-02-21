import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import LikeButton from "./LikeButton";
import { FaComment } from "react-icons/fa";

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
    <Link to={`/article/${article_id}`} className="article-card-link">
      <Card className="article-card">
        <Card.Img variant="top" src={image} />
        <div className="article-title">
          <Card.Title>{title}</Card.Title>
        </div>
        <Card.Body>
          <Card.Text className="article-body">{body ? body : null}</Card.Text>
          <div className="article-meta">
            <div className="meta-box">
              <p className="article-author">{author}</p>
            </div>
            <div className="meta-box">
              <p className="article-date">{created}</p>
            </div>
            <div className="meta-box">
              <LikeButton initialLikes={likes} article_id={article_id} />
            </div>
            <div className="meta-box">
              <FaComment className="comment-icon" />
              <p className="article-comments">{comment_count}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ArticleCard;
