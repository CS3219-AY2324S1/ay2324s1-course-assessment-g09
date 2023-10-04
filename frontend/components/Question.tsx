import { Button, Flex, Grid, GridItem, StepNumber } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Question = ({
  inputValues,
  setInputValues,
  isCreate,
  setIsCreate,
  colorMode,
}) => {
  const [questions, setQuestions] = useState(null);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:3001/questions/getall");
      setQuestions(res.data.qns);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  });

  const handleEdit = async ({
    qn_num,
    title,
    description,
    category,
    complexity,
  }) => {
    setInputValues({
      qn_num,
      title,
      description,
      category,
      complexity,
    });
    setIsCreate(false);
  };

  const deleteQuestion = async ({
    qn_num,
    title,
    description,
    category,
    complexity,
  }) => {
    await axios.post(`http://localhost:3001/questions/delete/${qn_num}`);
    fetchQuestions();
  };

  return (
    <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
      {/* <GridItem>{questions}</GridItem> */}
      {questions &&
        questions.map((question) => (
          <Grid
            templateColumns="repeat(6, 1fr)"
            key={`grid_${question.qn_num}`}
          >
            <GridItem
              border="1px solid"
              key={`grid_item_id_${question.qn_num}`}
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                height="100%"
                key={`flex_id_${question.qn_num}`}
              >
                {question.qn_num}
              </Flex>
            </GridItem>
            <GridItem
              border="1px solid"
              key={`grid_item_title${question.title}`}
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                height="100%"
                key={`flex_title_${question.title}`}
              >
                {question.title}
              </Flex>
            </GridItem>
            <GridItem
              border="1px solid"
              key={`grid_item_desc_${question.description}`}
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                height="100%"
                key={`flex_desc_${question.description}`}
              >
                {question.description}
              </Flex>
            </GridItem>
            <GridItem
              border="1px solid"
              key={`grid_item_category_${question.category}`}
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                height="100%"
                key={`flex_category_${question.category}`}
              >
                {question.category}
              </Flex>
            </GridItem>
            <GridItem
              border="1px solid"
              key={`grid_item_complexity_${question.complexity}`}
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                height="100%"
                key={`flex_complexity_${question.complexity}`}
              >
                {question.complexity}
              </Flex>
            </GridItem>
            <GridItem border="1px solid">
              <Flex justifyContent="center" alignItems="center" height="100%">
                <Button
                  size="sm"
                  my={1}
                  bgColor={colorMode === "light" ? "yellow.400" : "yellow.300"}
                  color="black"
                  mx={1}
                  onClick={() => handleEdit(question)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  my={1}
                  bgColor={colorMode === "light" ? "orange.400" : "orange.300"}
                  color="black"
                  mx={1}
                  onClick={() => deleteQuestion(question)}
                >
                  Delete
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        ))}
    </div>
  );
};

export default Question;
