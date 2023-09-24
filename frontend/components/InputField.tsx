import { Button, Flex, Grid, Icon, Input, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { AiTwotoneEdit } from "react-icons/ai";

import React, { useState } from "react";
import axios from "axios";

const InputField = ({
  inputValues,
  setInputValues,
  isCreate,
  setIsCreate,
  colorMode,
}) => {
  const [question, setQuestions] = useState(null);

  const fetchQuestions = async () => {
    const res = await axios.get("http://localhost:3000/questions");
    setQuestions(res.data.questions);
  };

  const handleSubmit = async () => {
    console.log(inputValues);
    const res = await axios.post("http://localhost:3000/question", {
      question_id: inputValues.question_id,
      title: inputValues.title,
      description: inputValues.description,
      category: inputValues.category,
      complexity: inputValues.complexity,
    });
    console.log(res);
    setInputValues({
      edit_id: "",
      question_id: "",
      title: "",
      description: "",
      category: "",
      complexity: "",
    });

    fetchQuestions();
  };

  const handleUpdate = async () => {
    const { _id } = inputValues;
    await axios.put(`http://localhost:3000/question/${_id}`, inputValues);

    setInputValues({
      edit_id: "",
      question_id: "",
      title: "",
      description: "",
      category: "",
      complexity: "",
    });

    setIsCreate(true);

    fetchQuestions();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const isButtonValid = () => {
    return (
      inputValues.question_id.trim() !== "" &&
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
        name="question_id"
        value={inputValues.question_id}
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
      {isCreate ? (
        <Button
          mb={3}
          colorScheme={colorMode === "light" ? "green" : "teal"}
          isDisabled={!isButtonValid()}
          type="submit"
          onClick={handleSubmit}
        >
          <Flex align="center">
            <Icon as={IoMdAdd} mr={1} />
            <Text>Create</Text>
          </Flex>
        </Button>
      ) : (
        <Button
          mb={3}
          colorScheme={colorMode === "light" ? "pink" : "purple"}
          onClick={handleUpdate}
        >
          <Flex align="center">
            <Icon as={AiTwotoneEdit} mr={1} />
            <Text>Update</Text>
          </Flex>
        </Button>
      )}
    </Grid>
  );
};

export default InputField;
