import {
  Button,
  Flex,
  Grid,
  GridItem,
  Modal,
  StepNumber,
  useDisclosure,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  Center,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios, { isCancel } from "axios";

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

const Question = ({
  inputValues,
  setInputValues,
  isCreate,
  setIsCreate,
  colorMode,
}) => {
  const [questions, setQuestions] = useState(null);
  const [description, setDescription] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  const [title, setTitle] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/questions/getall`);

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

  const handleModal = (question) => {
    setDescription(question.description);
    setTitle(question.title);
    setDifficulty(question.complexity);

    if (openQuestion === question) {
      if (isOpen) {
        onClose(); // Close the modal if it's open
      }
    } else {
      setOpenQuestion(question);
      onOpen(); // Open the modal if it's closed
    }
  };

  const htmlContent = { __html: description };

  return (
    <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
      {/* <GridItem>{questions}</GridItem> */}
      {questions &&
        questions.map((question) => (
          <Grid
            templateColumns="repeat(5, 1fr)"
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
              onClick={() => handleModal(question)}
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                height="100%"
                key={`flex_title_${question.title}`}
              >
                <Text
                  _hover={{
                    color: colorMode == "light" ? "teal.500" : "teal.300",
                    fontWeight: "semibold",
                    cursor: "pointer",
                  }}
                >
                  {question.title}
                </Text>
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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>
            {title}
            <Badge
              ml={3}
              colorScheme={
                String(difficulty).toLowerCase() == "easy"
                  ? "green"
                  : String(difficulty).toLowerCase() == "medium"
                  ? "orange"
                  : "red"
              }
            >
              {difficulty}
            </Badge>
          </ModalHeader>

          <ModalBody
            maxHeight="60vh"
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                width: "0.5em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent",
              },
            }}
          >
            <div
              dangerouslySetInnerHTML={htmlContent}
              style={{ overflowWrap: "anywhere" }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Question;
