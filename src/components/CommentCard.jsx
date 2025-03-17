import styled from "styled-components";
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
    <CardContainer>
      <CardBody>
        <CardText className="comment-body">{body}</CardText>
      </CardBody>
      <MetaContainer>
        <MetaBox>{author}</MetaBox>
        <MetaBox> {created}</MetaBox>
        <MetaBox>
          <LikeButton initialLikes={likes} />
        </MetaBox>
        <MetaBox>
          <TrashCan
            author={author}
            comment_id={comment_id}
            setComments={setComments}
          />
        </MetaBox>
      </MetaContainer>
    </CardContainer>
  );
}
export default CommentCard;

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: ${({ theme }) => theme.transitions.medium};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
  margin-bottom: 15px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CardText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const MetaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const MetaBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.secondary.light};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
  height: 50px;
`;
