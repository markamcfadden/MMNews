import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import UsersList from "../components/UsersList";

function CommunityPage() {
  return (
    <PageContainer>
      <NavBar></NavBar>
      <UsersList></UsersList>
      <Footer></Footer>
    </PageContainer>
  );
}

export default CommunityPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;
