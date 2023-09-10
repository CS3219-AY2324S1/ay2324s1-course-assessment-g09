import { Button, Flex, Grid, Icon, Input, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";

import React, { useState } from "react";
import axios from "axios";

const InputField = () => {
  const [question, setQuestions] = useState(null);

  const fetchQuestions = async () => {
    const res = await axios.get("http://localhost:3000/questions");
    setQuestions(res.data.questions);
  };

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3000/question", inputValues);
    console.log(res);
    setInputValues({
      id: "",
      title: "",
      description: "",
      category: "",
      complexity: "",
    });
    fetchQuestions();
  };

  const [inputValues, setInputValues] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    complexity: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const isButtonValid = () => {
    return (
      inputValues.id.trim() !== "" &&
      inputValues.title.trim() !== "" &&
      inputValues.description.trim() !== "" &&
      inputValues.category.trim() !== "" &&
      inputValues.complexity.trim() !== ""
    );
  };

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={6} marginX={5}>
      <Input
        placeholder="ID"
        variant="filled"
        name="id"
        value={inputValues.id}
        onChange={handleInputChange}
      />
      <Input
        placeholder="Title"
        variant="filled"
        name="title"
        value={inputValues.title}
        onChange={handleInputChange}
      />
      <Input
        placeholder="Description"
        variant="filled"
        name="description"
        value={inputValues.description}
        onChange={handleInputChange}
      />
      <Input
        placeholder="Category"
        variant="filled"
        name="category"
        value={inputValues.category}
        onChange={handleInputChange}
      />
      <Input
        placeholder="Complexity"
        variant="filled"
        name="complexity"
        value={inputValues.complexity}
        onChange={handleInputChange}
      />
      <Button
        mb={3}
        colorScheme="green"
        isDisabled={!isButtonValid()}
        type="submit"
        onClick={handleSubmit}
      >
        <Flex align="center">
          <Icon as={IoMdAdd} mr={1} />
          <Text>Create</Text>
        </Flex>
      </Button>
    </Grid>
  );
};

export default InputField;
