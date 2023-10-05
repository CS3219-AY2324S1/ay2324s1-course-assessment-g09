import { Button, Flex, Grid, Icon, Input, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { AiTwotoneEdit } from "react-icons/ai";

import React, { useState } from "react";
import axios from "axios";
import { extendTheme } from "@chakra-ui/react";

const QuestionInputField = ({
  inputValues,
  setInputValues,
  isCreate,
  setIsCreate,
  colorMode,
}) => {
  const [question, setQuestions] = useState(null);
  const [error, setError] = useState(false);

  const fetchQuestions = async () => {
    const res = await axios.get("http://localhost:3001/questions/getall");
    setQuestions(res.data.qns);
  };

  const handleSubmit = async () => {
    try {
      const res0 = await axios.get(
        `http://localhost:3001/questions/get/${inputValues.qn_num}`
      );

      setError(true);
      setInputValues({
        ...inputValues,
        qn_num: "",
      });
    } catch (error) {
      const res = await axios.post(
        "http://localhost:3001/questions/create",
        inputValues
      );

      console.log(res);
      setInputValues({
        qn_num: "",
        title: "",
        description: "",
        category: "",
        complexity: "",
      });

      setError(false);
      fetchQuestions();
    }
  };

  const handleUpdate = async () => {
    setError(false);
    const { qn_num } = inputValues;
    await axios.post(
      `http://localhost:3001/questions/update/${qn_num}`,
      inputValues
    );

    setInputValues({
      edit_id: "",
      qn_num: "",
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
      {error ? (
        <Input
          placeholder="ID already in use."
          variant="filled"
          name="qn_num"
          value={inputValues.qn_num}
          onChange={handleInputChange}
          borderColor={error && colorMode == "light" ? "red.500" : "red.300"}
          _placeholder={{ color: colorMode == "light" ? "red.500" : "red.300" }}
        />
      ) : (
        <Input
          placeholder="ID"
          variant="filled"
          name="qn_num"
          value={inputValues.qn_num}
          onChange={handleInputChange}
          // borderColor={error && colorMode == "light" ? "red.500" : "red.300"}
        />
      )}

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
          // type="submit"
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
