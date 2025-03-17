import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import ArticleTrashCan from "./ArticleTrash";
import LikeButton from "./LikeButton";

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
    <StyledLink to={`/article/${article_id}`}>
      <CardContainer>
        <CardImage src={image} />
        <CardTitle>{title}</CardTitle>
        <CardBody>
          <CardText>{body ? body : null}</CardText>
        </CardBody>
        <MetaContainer>
          <MetaBox>{author}</MetaBox>
          <MetaBox>{created}</MetaBox>
          <MetaBox>
            <LikeButton initialLikes={likes} article_id={article_id} />
          </MetaBox>
          <MetaBox>
            <FaComment />
            {comment_count}
          </MetaBox>
          {loggedInUser && loggedInUser.username === author ? (
            <MetaBox>
              <ArticleTrashCan author={author} article_id={article_id} />
            </MetaBox>
          ) : null}
        </MetaContainer>
      </CardContainer>
    </StyledLink>
  );
}

export default ArticleCard;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  max-width: 500px;
`;

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
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: 
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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

  & > :nth-child(n + 3) {
    grid-column: span 1;
  }

  ${({ theme }) => theme.breakpoints.sm} {
    grid-template-columns: repeat(3, 1fr);
  }
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
