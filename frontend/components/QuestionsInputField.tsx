import {
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
  setQuestions,
}) => {
  const [error, setError] = useState(false);

  const [selectedComplexity, setSelectedComplexity] = useState("");

  const fetchQuestions = async () => {
    const res = await axios.get(`question_service/questions`);
    setQuestions(res.data.qns);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`question_service/admin/questions`, inputValues);

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
      setSelectedComplexity("");
    } catch (error) {
      console.log(error);
      setError(true);
      setInputValues({
        ...inputValues,
        qn_num: "",
      });
    }
  };

  const handleUpdate = async () => {
    setError(false);
    const { qn_num } = inputValues;
    await axios.put(`question_service/admin/questions/${qn_num}`, inputValues);

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
    return (
      String(inputValues.qn_num).trim() !== "" &&
      inputValues.title.trim() !== "" &&
      inputValues.description.trim() !== "" &&
      inputValues.category.trim() !== "" &&
      inputValues.complexity.trim() !== ""
    );
  };

  const handleComplexityOption = (complexity) => {
    // console.log(complexity);
    setInputValues({ ...inputValues, complexity: complexity });
    setSelectedComplexity(complexity);
  };

  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      templateRows="repeat(2,1fr)"
      gap={2}
      height="20%"
    >
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
            fontSize={{ lg: "sm", xl: "sm", "2xl": "lg" }}
          />
        ) : (
          <Input
            placeholder="ID"
            variant="filled"
            name="qn_num"
            value={inputValues.qn_num}
            onChange={handleInputChange}
            fontSize={{ lg: "sm", xl: "sm", "2xl": "lg" }}
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
          fontSize={{ lg: "sm", xl: "sm", "2xl": "lg" }}
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
          fontSize={{ lg: "sm", xl: "sm", "2xl": "lg" }}
        />
      </GridItem>
      <GridItem rowStart={2}>
        <Input
          placeholder="Category"
          variant="filled"
          name="category"
          value={inputValues.category}
          onChange={handleInputChange}
          fontSize={{ lg: "sm", xl: "sm", "2xl": "lg" }}
        />
      </GridItem>
      <GridItem rowStart={2}>
        <Menu>
          <MenuButton
            as={Button}
            width="100%"
            colorScheme={
              selectedComplexity == "Easy"
                ? "green"
                : selectedComplexity == "Medium"
                  ? "orange"
                  : selectedComplexity == "Hard"
                    ? "red"
                    : "gray"
            }
          >
            {selectedComplexity || "Select Complexity"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleComplexityOption("Easy")}>
              Easy
            </MenuItem>
            <MenuItem onClick={() => handleComplexityOption("Medium")}>
              Medium
            </MenuItem>
            <MenuItem onClick={() => handleComplexityOption("Hard")}>
              Hard
            </MenuItem>
          </MenuList>
        </Menu>
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
