import styled from "styled-components";
import { useState, useEffect } from "react";
import { fetchTopics, postArticle } from "../api";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function AddForm() {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [formData, setFormData] = useState({
    author: loggedInUser.username,
    title: "",
    body: "",
    image_url: "",
    topic: "",
  });

  useEffect(() => {
    fetchTopics().then((topicsFromApi) => {
      const topicTitles = topicsFromApi.map((topic) => topic.slug);
      setTopics(topicTitles);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postArticle(formData);
      alert("Form submitted successfully");
      navigate(`/article/${response.article_id}`);
    } catch (error) {
      alert("An error occurred, Please try again");
      console.log("submission error", error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add an Article</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextArea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
        />
        <Select
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
        >
          <Option value="">Select a Topic</Option>
          {topics.map((topic) => (
            <Option key={topic} value={topic}>
              {topic}
            </Option>
          ))}
        </Select>
        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
}

export default AddForm;

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  height: 120px;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  appearance: none;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px;
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const Option = styled.option`
  font-size: 16px;
  padding: 10px;
`;
