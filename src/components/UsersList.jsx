import { useState, useEffect } from "react";
import { fetchAllUsers } from "../api";
import styled from "styled-components";
import UserCard from "./UsersCard";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers()
      .then((usersFromApi) => {
        setUsers(usersFromApi);
      })
      .catch((err) => {
        console.log(err, "error fetching users");
      });
  }, []);

  return (
    <UsersContainer>
      {users.map((user) => (
        <UserCard
          key={user.username}
          username={user.username}
          avatar_url={user.avatar_url}
        />
      ))}
    </UsersContainer>
  );
}

const UsersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-content: center;
  padding: 20px;
  max-width: 900px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default UsersList;
