import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchTopics } from "../api";
import { useNavigate } from "react-router-dom";

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
    if (selectedSortBy === "Date") {
      sort_by = "created_at";
    } else if (selectedSortBy === "Votes") {
      sort_by = "votes";
    } else if (selectedSortBy === "Comments") {
      sort_by = "comment_count";
    }

    let order;
    if (selectedOrder === "Ascending") {
      order = "asc";
    } else if (selectedOrder === "Descending") {
      order = "desc";
    }

    const params = new URLSearchParams();

    if (selectedTopic && selectedTopic !== "All Topics") {
      params.append("topic", selectedTopic);
    }

    params.append("sort_by", sort_by);
    params.append("order", order);

    navigate(`/search?${params.toString()}`);
  }

  return (
    <div>
      {!isLargeScreen ? (
        <>
          <Button
            variant="secondary"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="searchbar-collapse"
            aria-expanded={open}
            className="d-xl-none mb-3 secondary"
          >
            Filter Articles
          </Button>

          {isOpen ? (
            <div className="filter-dropdown">
              <form onSubmit={handleFilters}>
                <label>Filter by topic</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  <option>All topics</option>
                  {topics.map((topic) => {
                    return <option key={topic}>{topic}</option>;
                  })}
                </select>
                <label>Sort By</label>
                <select
                  value={selectedSortBy}
                  onChange={(e) => setSelectedSortBy(e.target.value)}
                >
                  <option>Date</option>
                  <option>Comments</option>
                  <option>Votes</option>
                </select>
                <label>Order</label>
                <select
                  value={selectedOrder}
                  onChange={(e) => setSelectedOrder(e.target.value)}
                >
                  <option>Descending</option>
                  <option>Ascending</option>
                </select>

                <button type="submit">Apply Filters</button>
              </form>
            </div>
          ) : null}
        </>
      ) : (
        <div className="filter-box">
          <form onSubmit={handleFilters}>
            <label className="filter-box-label">Filter by topic</label>
            <select
              className="filter-box-select"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option>All Topics</option>
              {topics.map((topic) => {
                return <option key={topic}>{topic}</option>;
              })}
            </select>

            <label className="filter-box-label">Sort By</label>
            <select
              className="filter-box-select"
              value={selectedSortBy}
              onChange={(e) => setSelectedSortBy(e.target.value)}
            >
              <option>Date</option>
              <option>Comments</option>
              <option>Votes</option>
            </select>

            <label className="filter-box-label">Order</label>
            <select
              className="filter-box-select"
              value={selectedOrder}
              onChange={(e) => setSelectedOrder(e.target.value)}
            >
              <option>Descending</option>
              <option>Ascending</option>
            </select>

            <Button className="filter-box-btn" variant="secondary">
              Apply Filters
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
