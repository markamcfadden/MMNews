import { useState, useEffect } from "react";
import { fetchTopics } from "../api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Searchbar() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedSortBy, setSelectedSortBy] = useState("Date");
  const [selectedOrder, setSelectedOrder] = useState("Descending");
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics().then((topicsFromApi) => {
      const topicTitles = topicsFromApi.map((topic) => topic.slug);
      setTopics(topicTitles);
    });

    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleFilters(e) {
    e.preventDefault();
    let sort_by;
    if (selectedSortBy === "Date") sort_by = "created_at";
    if (selectedSortBy === "Votes") sort_by = "votes";
    if (selectedSortBy === "Comments") sort_by = "comment_count";

    let order = selectedOrder === "Ascending" ? "asc" : "desc";

    const params = new URLSearchParams();
    if (selectedTopic !== "All Topics") params.append("topic", selectedTopic);
    params.append("sort_by", sort_by);
    params.append("order", order);

    navigate(`/search?${params.toString()}`);
  }

  return (
    <FilterContainer>
      {!isLargeScreen ? (
        <>
          <ToggleButton onClick={() => setIsOpen(!isOpen)}>
            Filter Articles
          </ToggleButton>

          {isOpen && (
            <DropdownMenu>
              <form onSubmit={handleFilters}>
                <DropdownItem>
                  <label>Filter by topic</label>
                  <StyledSelect
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                  >
                    <option>All Topics</option>
                    {topics.map((topic) => (
                      <option key={topic}>{topic}</option>
                    ))}
                  </StyledSelect>
                </DropdownItem>

                <DropdownItem>
                  <label>Sort By</label>
                  <StyledSelect
                    value={selectedSortBy}
                    onChange={(e) => setSelectedSortBy(e.target.value)}
                  >
                    <option>Date</option>
                    <option>Comments</option>
                    <option>Votes</option>
                  </StyledSelect>
                </DropdownItem>

                <DropdownItem>
                  <label>Order</label>
                  <StyledSelect
                    value={selectedOrder}
                    onChange={(e) => setSelectedOrder(e.target.value)}
                  >
                    <option>Descending</option>
                    <option>Ascending</option>
                  </StyledSelect>
                </DropdownItem>

                <ApplyButton type="submit">Apply Filters</ApplyButton>
              </form>
            </DropdownMenu>
          )}
        </>
      ) : (
        <FilterBox>
          <form onSubmit={handleFilters}>
            <FilterGroup>
              <FormLabel>Filter by topic</FormLabel>
              <StyledSelect
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
              >
                <Option>All Topics</Option>
                {topics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </StyledSelect>
            </FilterGroup>

            <FilterGroup>
              <FormLabel>Sort By</FormLabel>
              <StyledSelect
                value={selectedSortBy}
                onChange={(e) => setSelectedSortBy(e.target.value)}
              >
                <Option>Date</Option>
                <Option>Comments</Option>
                <Option>Votes</Option>
              </StyledSelect>
            </FilterGroup>

            <FilterGroup>
              <FormLabel>Order</FormLabel>
              <StyledSelect
                value={selectedOrder}
                onChange={(e) => setSelectedOrder(e.target.value)}
              >
                <Option>Descending</Option>
                <Option>Ascending</Option>
              </StyledSelect>
            </FilterGroup>

            <ApplyButton type="submit">Apply Filters</ApplyButton>
          </form>
        </FilterBox>
      )}
    </FilterContainer>
  );
}

export default Searchbar;

const FilterContainer = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
`;

const ToggleButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  border: none;
  padding: 12px 16px;
  font-size: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }
`;

const DropdownMenu = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const DropdownItem = styled.div`
  margin-bottom: 12px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  background: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary.main};
  }
`;

const ApplyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  border: none;
  padding: 12px 16px;
  font-size: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }
`;

const FilterBox = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const FilterGroup = styled.div`
  margin-bottom: 12px;
`;

const Option = styled.option`
  font-size: 16px;
  padding: 10px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;
