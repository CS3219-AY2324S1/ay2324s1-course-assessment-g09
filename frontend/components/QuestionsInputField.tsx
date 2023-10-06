import {
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { GiCancel } from "react-icons/gi";

import axios from "axios";
import { useState } from "react";
import dotenv from "dotenv";

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

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
    const res = await axios.get(`${IP_ADDRESS}:3001/questions/getall`);
    setQuestions(res.data.qns);
  };

  const handleSubmit = async () => {
    try {
      const res0 = await axios.get(
        `${IP_ADDRESS}:3001/questions/get/${inputValues.qn_num}`
      );

      setError(true);
      setInputValues({
        ...inputValues,
        qn_num: "",
      });
    } catch (error) {
      const res = await axios.post(
        `${IP_ADDRESS}:3001/questions/create`,
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
      `${IP_ADDRESS}:3001/questions/update/${qn_num}`,
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

  const handleCancel = () => {
    setInputValues({
      edit_id: "",
      qn_num: "",
      title: "",
      description: "",
      category: "",
      complexity: "",
    });

    setIsCreate(true);
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
    <Grid templateColumns="repeat(6, 1fr)" templateRows="repeat(2,1fr)" gap={2}>
      <GridItem>
        {error ? (
          <Input
            placeholder="ID already in use."
            variant="filled"
            name="qn_num"
            value={inputValues.qn_num}
            onChange={handleInputChange}
            borderColor={error && colorMode == "light" ? "red.500" : "red.300"}
            _placeholder={{
              color: colorMode == "light" ? "red.500" : "red.300",
            }}
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
      </GridItem>
      <GridItem>
        <Input
          placeholder="Title"
          variant="filled"
          name="title"
          value={inputValues.title}
          onChange={handleInputChange}
        />
      </GridItem>
      <GridItem
        rowSpan={2}
        colSpan={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Textarea
          placeholder="Description"
          variant="filled"
          name="description"
          // height="0.25rem"
          value={inputValues.description}
          onChange={handleInputChange}
          height="100%"
          // maxHeight="1.5rem"
          resize="none"
        />
      </GridItem>
      <GridItem rowStart={2}>
        <Input
          placeholder="Category"
          variant="filled"
          name="category"
          value={inputValues.category}
          onChange={handleInputChange}
        />
      </GridItem>
      <GridItem rowStart={2}>
        <Input
          placeholder="Complexity"
          variant="filled"
          name="complexity"
          value={inputValues.complexity}
          onChange={handleInputChange}
        />
      </GridItem>

      {isCreate ? (
        <GridItem
          rowSpan={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            colorScheme={colorMode === "light" ? "green" : "teal"}
            isDisabled={!isButtonValid()}
            // type="submit"
            onClick={handleSubmit}
            height="100%"
            width="100%"
          >
            <Flex align="center">
              <Icon as={IoMdAdd} mr={1} />
              <Text>Create</Text>
            </Flex>
          </Button>
        </GridItem>
      ) : (
        <>
          <GridItem>
            <Button
              colorScheme={colorMode === "light" ? "pink" : "purple"}
              onClick={handleUpdate}
              width="100%"
            >
              <Flex align="center">
                <Icon as={AiTwotoneEdit} mr={1} />
                <Text>Update</Text>
              </Flex>
            </Button>
          </GridItem>
          <GridItem>
            <Button
              colorScheme={colorMode === "light" ? "gray" : "green"}
              onClick={handleCancel}
              width="100%"
            >
              <Flex align="center">
                <Icon as={GiCancel} mr={1} />
                <Text>Cancel</Text>
              </Flex>
            </Button>
          </GridItem>
        </>
      )}
    </Grid>
  );
};

export default QuestionInputField;
