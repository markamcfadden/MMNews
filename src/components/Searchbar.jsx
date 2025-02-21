import { Card, Form, Button, Collapse } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchTopics } from "../api";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedSortBy, setSelectedSortBy] = useState("Date");
  const [selectedOrder, setSelectedOrder] = useState("Descending");
  const [open, setOpen] = useState(false);
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
            onClick={() => setOpen(!open)}
            aria-controls="searchbar-collapse"
            aria-expanded={open}
            className="d-xl-none mb-3 secondary"
          >
            Filter Articles
          </Button>

          <Collapse in={open}>
            <Card>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Filter by topic</Form.Label>
                  <Form.Select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                  >
                    <option>All Topics</option>
                    {topics.map((topic) => {
                      return <option key={topic}>{topic}</option>;
                    })}
                  </Form.Select>
                  <Form.Label>Sort By</Form.Label>
                  <Form.Select
                    value={selectedSortBy}
                    onChange={(e) => setSelectedSortBy(e.target.value)}
                  >
                    <option>Date</option>
                    <option>Comments</option>
                    <option>Votes</option>
                  </Form.Select>
                  <Form.Label>Order</Form.Label>
                  <Form.Select
                    value={selectedOrder}
                    onChange={(e) => setSelectedOrder(e.target.value)}
                  >
                    <option>Descending</option>
                    <option>Ascending</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="secondary" onClick={handleFilters}>
                  Apply filters
                </Button>
              </Card.Body>
            </Card>
          </Collapse>
        </>
      ) : (
        <Card className="ls-filter-box">
          <Card.Body>
            <Form.Group className="ls-filter-group">
              <Form.Label>Filter by topic</Form.Label>
              <Form.Select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
              >
                <option>All Topics</option>
                {topics.map((topic) => {
                  return <option key={topic}>{topic}</option>;
                })}
              </Form.Select>
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                value={selectedSortBy}
                onChange={(e) => setSelectedSortBy(e.target.value)}
              >
                <option>Date</option>
                <option>Comments</option>
                <option>Votes</option>
              </Form.Select>
              <Form.Label>Order</Form.Label>
              <Form.Select
                value={selectedOrder}
                onChange={(e) => setSelectedOrder(e.target.value)}
              >
                <option>Descending</option>
                <option>Ascending</option>
              </Form.Select>
            </Form.Group>
            <Button
              variant="secondary"
              className="ls-btn-apply-filter"
              onClick={handleFilters}
            >
              Apply filters
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default Searchbar;
