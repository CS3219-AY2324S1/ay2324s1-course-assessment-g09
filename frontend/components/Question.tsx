import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryTag from "./CategoryTag";
import React from "react";

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

const Question = ({
  inputValues,
  setInputValues,
  isCreate,
  setIsCreate,
  colorMode,
  userMode,
  questions,
  fetchQuestions,
  selectedComplexity,
  setSelectedCategory,
  selectedCategory,
}) => {
  // const [questions, setQuestions] = useState(null);
  const [description, setDescription] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [modalCategory, setModalCategory] = useState([]);

  const [question, setQuestion] = useState({
    qn_num: 0,
    title: "",
    description: "",
    category: [],
    complexity: "",
  });

  const [title, setTitle] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isQuestionDialogOpen,
    onOpen: openQuestionDialog,
    onClose: closeQuestionDialog,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const handleCloseQuestionDialog = () => {
    closeQuestionDialog();
    setQuestion({
      qn_num: 0,
      title: "",
      description: "",
      category: [],
      complexity: "",
    });
  };

  const handleOpenQuestionDialog = (deleteQuestion) => {
    if (question === deleteQuestion) {
      if (isQuestionDialogOpen) {
        handleCloseQuestionDialog();
      }
    } else {
      setQuestion(deleteQuestion);
      openQuestionDialog(); // Open the modal if it's closed
    }
  };

  useEffect(() => {
    console.log(question);
  }, [question]);
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
      complexity,
    });
    setSelectedCategory(category);
    setIsCreate(false);
  };

  const deleteQuestion = async ({
    qn_num,
    title,
    description,
    category,
    complexity,
  }) => {
    await axios.delete(`question_service/admin/questions/${qn_num}`);
    handleCloseQuestionDialog();
    fetchQuestions();
  };

  const handleModal = (question, index) => {
    let desc = question.description;

    desc = desc.replace(/<code>/g, "");
    desc = desc.replace(/<\/code>/g, "");

    setDescription(desc);

    setTitle(question.title);
    setDifficulty(question.complexity);
    setModalCategory(question.category);
    // setCategory(question.category);

    if (openQuestion === question) {
      if (isOpen) {
        onClose(); // Close the modal if it's open
      }
    } else {
      setOpenQuestion(question);
      onOpen(); // Open the modal if it's closed
    }
  };

  const handleClose = () => {
    onClose();
    setOpenQuestion(null);
  };

  // const htmlContent = { __html: description };

  return (
    <Box
      flexDirection="column"
      height="100%"
      // height={userMode == "user" ? "90%" : "100%"}
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "0.2rem",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor:
            colorMode == "light" ? "rgba(0,0,0,0.5)" : "RGBA(20, 20, 20, 0.76)",
        },
      }}
    >
      {selectedComplexity == "" &&
        questions &&
        questions.map((question, index) => (
          <Grid
            templateColumns={
              userMode == "admin" ? "repeat(13, 1fr)" : "repeat(11, 1fr)"
            }
            key={`grid_${question.qn_num}`}
            backgroundColor={
              index % 2 === 0
                ? colorMode == "light"
                  ? "gray.300"
                  : "gray.700"
                : colorMode == "light"
                ? "gray.400"
                : "gray.800"
            }
          >
            <GridItem key={`grid_item_id_${question.qn_num}`} colSpan={1}>
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                height="100%"
                key={`flex_id_${question.qn_num}`}
                fontSize={{ lg: "md", xl: "md", "2xl": "lg" }}
                pl={2}
              >
                {question.qn_num}
              </Flex>
            </GridItem>
            <GridItem key={`grid_item_title${question.title}`} colSpan={4}>
              <Flex
                justifyContent="flex-start"
                pl={2}
                alignItems="center"
                height="100%"
                key={`flex_title_${question.title}`}
              >
                <Text
                  _hover={{
                    color: colorMode == "light" ? "teal.500" : "teal.300",
                    fontWeight: "extrabold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleModal(question, index)}
                  fontSize={{ lg: "sm", xl: "sm", "2xl": "md" }}
                  fontWeight="semibold"
                  my={2}
                  isTruncated
                >
                  {question.title}
                </Text>
              </Flex>
            </GridItem>
            <GridItem
              key={`grid_item_category_${question.qn_num}`}
              colSpan={4}
              width="100%"
            >
              <Flex
                justifyContent="flex-start"
                pl={2}
                alignItems="center"
                height="100%"
                key={`flex_category_${question.qn_num}`}
                fontSize={{ lg: "sm", xl: "sm", "2xl": "md" }}
                width="100%"
                isTruncated
              >
                {question.category.toString()}
              </Flex>
            </GridItem>
            <GridItem
              key={`grid_item_complexity_${question.complexity}`}
              colSpan={2}
            >
              <Flex
                justifyContent="flex-start"
                pl={2}
                alignItems="center"
                height="100%"
                key={`flex_complexity_${question.complexity}`}
                fontSize={{ lg: "sm", xl: "sm", "2xl": "md" }}
              >
                <Badge
                  variant="outline"
                  colorScheme={
                    question.complexity == "Easy"
                      ? "green"
                      : question.complexity == "Medium"
                      ? "orange"
                      : "red"
                  }
                  fontWeight="bold"
                >
                  {question.complexity}
                </Badge>
              </Flex>
            </GridItem>
            {userMode == "admin" && (
              <GridItem colSpan={2}>
                <Flex justifyContent="center" alignItems="center" height="100%">
                  <Button
                    size="sm"
                    my={1}
                    bgColor={
                      colorMode === "light" ? "purple.100" : "purple.200"
                    }
                    color="black"
                    mx={1}
                    onClick={() => handleEdit(question)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    my={1}
                    bgColor={colorMode === "light" ? "pink.200" : "pink.300"}
                    color="black"
                    mx={1}
                    onClick={() => handleOpenQuestionDialog(question)}
                  >
                    Delete
                  </Button>
                </Flex>
                <AlertDialog
                  isOpen={isQuestionDialogOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={closeQuestionDialog}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Question
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Are you sure you want to delete this question? This
                        action can't be reversed.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={closeQuestionDialog}>
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          ml={3}
                          onClick={() => deleteQuestion(question)}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </GridItem>
            )}
          </Grid>
        ))}

      {selectedComplexity != "" &&
        questions &&
        questions
          .filter((qns) => qns.complexity == selectedComplexity)
          .map((question, index) => (
            <Grid
              templateColumns={
                userMode == "admin" ? "repeat(13, 1fr)" : "repeat(11, 1fr)"
              }
              key={`grid_${question.qn_num}`}
              backgroundColor={
                index % 2 === 0
                  ? colorMode == "light"
                    ? "gray.300"
                    : "gray.700"
                  : colorMode == "light"
                  ? "gray.400"
                  : "gray.800"
              }
            >
              <GridItem key={`grid_item_id_${question.qn_num}`} colSpan={1}>
                <Flex
                  justifyContent="flex-start"
                  alignItems="center"
                  height="100%"
                  key={`flex_id_${question.qn_num}`}
                  fontSize={{ lg: "md", xl: "md", "2xl": "lg" }}
                  pl={2}
                >
                  {question.qn_num}
                </Flex>
              </GridItem>
              <GridItem
                key={`grid_item_title${question.title}`}
                onClick={() => handleModal(question, index)}
                colSpan={4}
              >
                <Flex
                  justifyContent="flex-start"
                  pl={2}
                  alignItems="center"
                  height="100%"
                  key={`flex_title_${question.title}`}
                >
                  <Text
                    _hover={{
                      color: colorMode == "light" ? "teal.500" : "teal.300",
                      fontWeight: "extrabold",
                      cursor: "pointer",
                    }}
                    fontSize={{ lg: "sm", xl: "sm", "2xl": "md" }}
                    fontWeight="semibold"
                    my={2}
                  >
                    {question.title}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem
                key={`grid_item_category_${question.qn_num}`}
                colSpan={4}
              >
                <Flex
                  justifyContent="flex-start"
                  pl={2}
                  alignItems="center"
                  height="100%"
                  key={`flex_category_${question.qn_num}`}
                  fontSize={{ lg: "sm", xl: "sm", "2xl": "md" }}
                >
                  {question.category.toString}
                </Flex>
              </GridItem>
              <GridItem
                key={`grid_item_complexity_${question.complexity}`}
                colSpan={2}
              >
                <Flex
                  justifyContent="flex-start"
                  pl={2}
                  alignItems="center"
                  height="100%"
                  key={`flex_complexity_${question.complexity}`}
                  fontSize={{ lg: "sm", xl: "sm", "2xl": "md" }}
                >
                  <Badge
                    variant="outline"
                    colorScheme={
                      question.complexity == "Easy"
                        ? "green"
                        : question.complexity == "Medium"
                        ? "orange"
                        : "red"
                    }
                    fontWeight="bold"
                  >
                    {question.complexity}
                  </Badge>
                </Flex>
              </GridItem>
              {userMode == "admin" && (
                <GridItem colSpan={2}>
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <Button
                      size="sm"
                      my={1}
                      bgColor={
                        colorMode === "light" ? "purple.100" : "purple.200"
                      }
                      color="black"
                      mx={1}
                      onClick={() => handleEdit(question)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      my={1}
                      bgColor={colorMode === "light" ? "pink.200" : "pink.300"}
                      color="black"
                      mx={1}
                    >
                      Delete
                    </Button>
                  </Flex>
                </GridItem>
              )}
            </Grid>
          ))}

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
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
            <CategoryTag categoryTag={modalCategory} />
          </ModalHeader>

          <ModalBody
            maxHeight="60vh"
            overflowY="auto"
            mx={5}
            css={{
              "&::-webkit-scrollbar": {
                width: "0.25em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor:
                  colorMode == "light"
                    ? "RGBA(0, 0, 0, 0.7)"
                    : "RGBA(255, 255, 255, 0.48)",
              },
            }}
          >
            <div
              style={{
                overflowWrap: "break-word",
              }}
            >
              <style>
                {`
      div > pre {
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
      }
    `}
              </style>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isQuestionDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeQuestionDialog}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Question
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this question? This action can't
              be reversed.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCloseQuestionDialog}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => deleteQuestion(question)}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Question;
