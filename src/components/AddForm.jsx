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
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  box-sizing: border-box;
  height: 180px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary.main};
  }
`;

const Select = styled.select`
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

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.contrastText};
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

const Option = styled.option`
  font-size: 16px;
  padding: 10px;
`;
