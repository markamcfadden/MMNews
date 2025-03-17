import { Link } from "react-router-dom";
import styled from "styled-components";

function UserCard({ username, avatar_url }) {
  return (
    <Card to={`/${username}`}>
      <Avatar src={avatar_url} alt={`${username}'s avatar`} />
      <Username>@{username}</Username>
    </Card>
  );
}

export default UserCard;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  background: ${({ theme }) => theme.colors.secondary.light};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1/1;
  margin-bottom: 10px;
`;

const Username = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;
