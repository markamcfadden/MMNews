import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import LikeButton from "./LikeButton";
import { FaComment } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import ArticleTrashCan from "./ArticleTrash";

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
  const { loggedInUser } = useContext(UserContext);

  return (
    <Link to={`/article/${article_id}`} className="article-card-link">
      <Card className="article-card">
        <Card.Img variant="top" src={image} />
        <div className="article-title">
          <Card.Title>{title}</Card.Title>
        </div>
        {loggedInUser?.username === author && (
          <div>
            <ArticleTrashCan author={author} article_id={article_id} />
          </div>
        )}
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
