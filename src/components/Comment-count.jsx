import { FaCommentAlt } from "react-icons/fa";

function CommentCount({ commentCount }) {
  return (
    <div>
      <FaCommentAlt /> {commentCount}
    </div>
  );
}

export default CommentCount;
