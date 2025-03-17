import Footer from "../components/Footer";
import AddForm from "../components/AddForm";
import NavBar from "../components/Navbar";

function AddArticlePage() {
  return (
    <PageContainer>
      <NavBar />
      <AddForm />
      <Footer />
    </PageContainer>
  );
}

export default AddArticlePage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;
