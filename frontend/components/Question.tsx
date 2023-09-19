import { Button, Flex, Grid, GridItem, StepNumber } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Question = () => {
  const [questions, setQuestions] = useState(null);

  const fetchQuestions = async () => {
    const res = await axios.get("http://localhost:3000/questions");
    setQuestions(res.data.questions);
  };

  useEffect(() => {
    fetchQuestions();
  });

  const deleteQuestion = async ({
    id,
    title,
    description,
    category,
    complexity,
  }) => {
    await axios.delete(`http://localhost:3000/question/${id}`);
    fetchQuestions();
  };

  return (
    <>
      {/* <GridItem>{questions}</GridItem> */}
      {questions &&
        questions.map((question) => (
          <Grid templateColumns="repeat(6, 1fr)" key={`grid_${question.id}`}>
            <GridItem border="1px solid" key={`grid_item_id_${question.id}`}>
              <Flex
                justifyContent="center"
                alignItems="center"
                height="100%"
                key={`flex_id_${question.id}`}
              >
                {question.id}
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
                <Button size="sm" my={1} bgColor="yellow.200" mx={1}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  my={1}
                  bgColor="orange.200"
                  mx={1}
                  onClick={() => deleteQuestion(question)}
                >
                  Delete
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        ))}
    </>
  );
};

export default Question;
