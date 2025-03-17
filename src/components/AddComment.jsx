import styled from "styled-components";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import { postComment } from "../api";

function AddComment({ article_id, setComments }) {
  const { loggedInUser } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleCancel() {
    setComment("");
    setIsExpanded(false);
    setError("");
    setSuccessMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    if (!loggedInUser) {
      setError("You must be logged in to comment on an article");
      setIsSubmitting(false);
      return;
    }
    const commentToPost = { username: loggedInUser.username, body: comment };

    postComment(article_id, commentToPost)
      .then((newComment) => {
        setComment("");
        setIsExpanded(false);
        setSuccessMessage("Comment posted successfully");
        setIsSubmitting(false);

        setComments((prev) => [newComment, ...prev]);

        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(() => {
        setError("Failed to post comment. Please try again");
        setIsSubmitting(false);
      });
  }

  return (
    <StyledForm>
      <TextArea
        rows={isExpanded ? 3 : 1}
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onFocus={() => setIsExpanded(true)}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      {isExpanded && (
        <ButtonContainer>
          <StyledButton
            type="submit"
            onClick={handleSubmit}
            disabled={comment.length < 1 || isSubmitting}
          >
            Comment
          </StyledButton>
          <StyledButton onClick={handleCancel}>Cancel</StyledButton>
        </ButtonContainer>
      )}
    </StyledForm>
  );
}

export default AddComment;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 80%;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  box-sizing: border-box;
  height: 100px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary.main};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
`;

const StyledButton = styled.button`
  padding: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.contrastText};
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
  width: 50%;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.status.error};
  font-size: 0.9rem;
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.status.success};
  font-size: 0.9rem;
`;
