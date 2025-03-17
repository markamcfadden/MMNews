import styled from "styled-components";
import ArticlesList from "../components/Article-list";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import { useSearchParams } from "react-router-dom";

function Homepage() {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  return (
    <PageContainer>
      <NavBar />
      <Searchbar />
      <ArticlesList params={queryParams} />
      <Footer />
    </PageContainer>
  );
}

export default Homepage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;
