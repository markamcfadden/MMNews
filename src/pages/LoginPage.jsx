import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { fetchUsers } from "../api";
import styled from "styled-components";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

function LoginPage() {
  const { setLoggedInUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function setUser(e) {
    e.preventDefault();
    fetchUsers(username)
      .then((user) => {
        setError("");
        setLoggedInUser(user);
        navigate("/");
      })
      .catch(() => {
        setError("Username does not exist. Please try again.");
      });
  }

  return (
    <PageContainer>
      <NavBar />
      <LoginContainer>
        <LoginForm onSubmit={setUser}>
          <FormField>
            <FormLabel>Username</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormField>
          <SubmitButton type="submit">Login</SubmitButton>
          {error && <ErrorText>{error}</ErrorText>}
        </LoginForm>
      </LoginContainer>
      <Footer />
    </PageContainer>
  );
}

export default LoginPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.xss};
`;

const LoginForm = styled.form`
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: 90%;
  max-width: 400px;
`;

const FormField = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FormLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary.main};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
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
`;

const ErrorText = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.status.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
