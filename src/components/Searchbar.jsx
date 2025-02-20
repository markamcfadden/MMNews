import { Card, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchTopics } from "../api";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics().then((topicsFromApi) => {
      const topicTitles = topicsFromApi.map((topic) => topic.slug);
      setTopics(topicTitles);
    });
  }, []);

  function handleFilters(e) {
    e.preventDefault();
    if (selectedTopic === "All Topics") {
      navigate("/");
    } else {
      navigate(`/${selectedTopic}`);
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Filter Articles</Card.Title>
        <Form.Group></Form.Group>
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
      </Card.Body>
      <Button variant="secondary" onClick={handleFilters}>
        Apply filters
      </Button>
    </Card>
  );
}

export default Searchbar;
