import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Grid,
  GridItem,
  Badge,
  Flex,
  HStack,
  useColorMode,
  Avatar,
  Heading,
  Center,
} from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { set } from "zod";

type history = {
  _id: string;
  questionName: string;
  question: string;
  code: string;
  language: string;
  theme: string;
  createdAt: string;
  updatedAt: string;
  user1: string;
  user2: string;
};
export default function History() {
  const [user, setUser] = useState("");
  const [history, setHistory] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const authUser = JSON.parse(sessionStorage.getItem("login")).id;
        setUser(authUser);
        console.log(`/history_service/get/${authUser}`);
        const res = await axios.get(`/history_service/get/${authUser}`);
        console.log(res.data);
        setHistory(
          res.data
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
        );
      } catch (error) {
        console.log("ERROR: ", error);
      }
    };
    fetchHistory();
  }, []);
  return (
    <Box width="95%" height="95%">
      {history === null || (Array.isArray(history) && history.length === 0) ? (
        <Center height="100%" width="100%">
          History is currently empty...
        </Center>
      ) : (
        <>
          <Box width="100%" mt={1} pb={1} borderBottom="1px solid">
            <HStack mx={1} width="100%">
              <Text width="40%">Timestamp</Text>

              <Text maxW="45%" isTruncated noOfLines={1}>
                Question Name
              </Text>
            </HStack>
          </Box>
          <Box
            my={1}
            width="100%"
            height="90%"
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                width: "0.2rem",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor:
                  colorMode == "light"
                    ? "rgba(0,0,0,0.5)"
                    : "RGBA(20, 20, 20, 0.76)",
              },
            }}
          >
            {/* <Flex
        marginY={2}
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
      > */}
            {history &&
              history.map((record, index) => (
                <Box
                  key={index}
                  width="100%"
                  onClick={() => {
                    setSelectedItem(record);
                    onOpen();
                  }}
                  overflowX="hidden"
                  py={1}
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
                  <HStack
                    mx={1}
                    width="100%"
                    _hover={{ fontWeight: "bold", cursor: "pointer" }}
                  >
                    {/* <Text>{index}</Text> */}
                    <Text width="40%">
                      {new Date(record.createdAt)
                        .toLocaleDateString("en-GB")
                        .replaceAll("/", "-")}{" "}
                      {new Date(record.createdAt)
                        .toLocaleTimeString("it-IT")
                        .substring(0, 5)}
                    </Text>

                    <Text maxW="45%" isTruncated noOfLines={1}>
                      {record.questionName}
                    </Text>
                  </HStack>
                </Box>
              ))}

            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
              <ModalOverlay />
              <ModalContent maxW="80%" minH="80%">
                {selectedItem && (
                  <Box>
                    <ModalHeader>
                      <HStack>
                        <Text>{selectedItem.questionName}</Text>
                        <Badge
                          colorScheme={
                            String(selectedItem.difficulty).toLowerCase() ==
                              "easy"
                              ? "green"
                              : String(selectedItem.difficulty).toLowerCase() ==
                                "medium"
                                ? "orange"
                                : "red"
                          }
                        >
                          {selectedItem.difficulty}
                        </Badge>
                        <Text textDecoration="InfoText" fontStyle="italic">
                          ft. {selectedItem.user2}
                        </Text>
                      </HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={6}
                        height="75vh"
                      >
                        <GridItem colSpan={1}>
                          <Text>{selectedItem.question}</Text>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <Editor
                            defaultValue={selectedItem.code}
                            defaultLanguage={selectedItem.language}
                            theme={selectedItem.theme}
                            options={{
                              readOnly: true,
                            }}
                          />
                        </GridItem>
                      </Grid>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Box>
                )}
              </ModalContent>
            </Modal>
            {/* </Flex> */}
          </Box>
        </>
      )}
    </Box>
  );
}
