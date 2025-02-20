import { Card, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchTopics } from "../api";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSortBy, setSelectedSortBy] = useState("Date");
  const [selectedOrder, setSelectedOrder] = useState("Descending");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics().then((topicsFromApi) => {
      const topicTitles = topicsFromApi.map((topic) => topic.slug);
      setTopics(topicTitles);
    });
  }, []);

  function handleFilters(e) {
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
    e.preventDefault();

    if (selectedTopic === "All Topics") {
      navigate(`/sort_by=${sort_by}&order=${order}`);
    } else {
      navigate(`/topic=${selectedTopic}&sort_by=${sort_by}&order=${order}`);
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Filter Articles</Card.Title>
        <Form.Group>
          <Form.Label>Filter by topic</Form.Label>
          <Form.Select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option>Select Topic</option>
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
      </Card.Body>
      <Button variant="secondary" onClick={handleFilters}>
        Apply filters
      </Button>
    </Card>
  );
}

export default Searchbar;
