import styled from "styled-components";
import { useState } from "react";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";

import Spinner from "react-bootstrap/Spinner";
import { fetchCommentsByArticleId } from "../api";

function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState("");

  function showHideComments() {
    if (showComments) {
      setShowComments(false);
      return;
    }

    setShowComments(true);
    setIsLoading(true);
    setError("");

    fetchCommentsByArticleId(article_id)
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError("Failed to load comments, please try again");
      });
  }

  return (
    <CommentsListContainer>
      <AddComment article_id={article_id} setComments={setComments} />
      <CommentsButton onClick={showHideComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </CommentsButton>

      {error ? <p>{error}</p> : null}

      {showComments ? (
        <div className="grid-container">
          {isLoading ? (
            <Spinner />
          ) : (
            comments.map((comment) => (
              <CommentCard
                key={comment.comment_id}
                setComments={setComments}
                comment_id={comment.comment_id}
                body={comment.body}
                author={comment.author}
                likes={comment.votes}
                created={new Date(comment.created_at).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              />
            ))
          )}
        </div>
      ) : null}
    </CommentsListContainer>
  );
}

export default CommentsList;

const CommentsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

const CommentsButton = styled.button`
  width: 80%;
  padding: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:focus {
    outline: none;
  }

  margin-top: 15px;
  margin-bottom: 15px;
`;
