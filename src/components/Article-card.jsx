import LikeButton from "./LikeButton";
import CommentCount from "./Comment-count";

function ArticleCard({ title, author, created, likes, image, comment_count }) {
  return (
    <div className="article-card">
      <img src={image}></img>
      <h3>{title}</h3>
      <p>
        Author:{author} <br />
        {created}
      </p>
      <div className="article-card-actions">
        <LikeButton initialLikes={likes} />
        <CommentCount commentCount={comment_count} />
      </div>
    </div>
  );
}

export default ArticleCard;
