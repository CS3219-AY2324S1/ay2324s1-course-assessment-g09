import { Button, Flex, Grid, Icon, Input, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { AiTwotoneEdit } from "react-icons/ai";

import React, { useState } from "react";
import axios from "axios";

const QuestionInputField = ({
  inputValues,
  setInputValues,
  isCreate,
  setIsCreate,
  colorMode,
}) => {
  const [question, setQuestions] = useState(null);

  const fetchQuestions = async () => {
    const res = await axios.get("http://localhost:3001/questions/getall");
    setQuestions(res.data.qns);
  };

  const handleSubmit = async () => {
    console.log(inputValues);
    const res = await axios.post("http://localhost:3001/questions/create", {
      // question_id: inputValues.question_id,
      qn_num: inputValues.qn_num,
      title: inputValues.title,
      description: inputValues.description,
      category: inputValues.category,
      complexity: inputValues.complexity,
    });

    console.log(res);
    setInputValues({
      qn_num: "",
      title: "",
      description: "",
      category: "",
      complexity: "",
    });

    fetchQuestions();
  };

  const handleUpdate = async () => {
    const { qn_num } = inputValues;
    await axios.post(
      `http://localhost:3001/questions/update/${qn_num}`,
      inputValues
    );

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
    console.log(inputValues);
    return (
      String(inputValues.qn_num).trim() !== "" &&
      inputValues.title.trim() !== "" &&
      inputValues.description.trim() !== "" &&
      inputValues.category.trim() !== "" &&
      inputValues.complexity.trim() !== ""
    );
  };

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={6}>
      <Input
        placeholder="ID"
        variant="filled"
        name="qn_num"
        value={inputValues.qn_num}
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

export default QuestionInputField;
