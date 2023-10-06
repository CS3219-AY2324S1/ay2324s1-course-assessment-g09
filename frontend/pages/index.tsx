import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import QuestionInputField from "../components/QuestionsInputField";
import Questions from "../components/Questions";

import ToggleMode from "../components/ToggleMode";
import QuestionsHeader from "../components/QuestionsHeader";
import UserInputField from "../components/UserInputField";
import UserHeader from "../components/UserHeader";
import Users from "../components/Users";

import { MdQuestionAnswer } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";

import { useRouter } from "next/router";
import Collaboration from "./collaboration";

const IndexPage = () => {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  const [questionInputValues, setQuestionInputValues] = useState({
    edit_id: "",
    question_id: "",
    title: "",
    description: "",
    category: "",
    complexity: "",
  });

  const [userInputValues, setUserInputValues] = useState({
    user_id: "",
    name: "",
  });

  const [isCreate, setIsCreate] = useState(true);
  const [displayDB, setDisplayDB] = useState("questions");

  const [session, setSession] = useState();
  const [role, setRole] = useState("user");

  useEffect(() => {
    const login = JSON.parse(window.sessionStorage.getItem("login"));

    if (login && login.userLogin) {
      setSession(login.token);
    } else {
      router.push("/signin");
    }
  }, []);


  const toggleDisplayDB = () => {
    displayDB == "questions"
      ? setDisplayDB("users")
      : setDisplayDB("questions");
  };


  const handleSignOut = () => {
    window.sessionStorage.removeItem("login");
    router.push("/signin");
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab
            _selected={{
              color: colorMode == "light" ? "blue.400" : "blue.300",
              fontWeight: "bold",
            }}
            _hover={{
              color: colorMode == "light" ? "purple.500" : "purple.300",
              fontWeight: "bold",
            }}
          >
            <Icon as={MdQuestionAnswer} boxSize={5} marginRight={2} /> Question
            Service
          </Tab>
          <Tab
            _selected={{
              color: colorMode == "light" ? "blue.400" : "blue.300",
              fontWeight: "bold",
            }}
            _hover={{
              color: colorMode == "light" ? "purple.500" : "purple.300",
              fontWeight: "bold",
            }}
          >
            <Icon as={AiOutlineUser} boxSize={5} marginRight={2} />
            User Service
          </Tab>
          <Tab
            _selected={{
              color: colorMode == "light" ? "blue.400" : "blue.300",
              fontWeight: "bold",
            }}
            _hover={{
              color: colorMode == "light" ? "purple.500" : "purple.300",
              fontWeight: "bold",
            }}
          >
            <Icon as={FaHandshake} boxSize={5} marginRight={2} />
            Collaboration Service
          </Tab>
          <div style={{ marginLeft: "auto" }}>
            <ToggleMode
              colorMode={colorMode}
              toggleColorMode={toggleColorMode}
              toggleDisplayDB={toggleDisplayDB}
              displayDB={displayDB}
            />
          </div>
          <div>
            <Button onClick={handleSignOut} bgColor="red.100">
              signout
            </Button>
          </div>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg={colorMode == "light" ? "blue.400" : "blue.300"}
          borderRadius="1px"
        />

        <Flex justifyContent="center" alignItems="center" flex="1">
          <Flex justifyContent="center" alignItems="center">
            <Flex
              flexDirection="column"
              align="center"
              py={6}
              borderRadius="xl"
              marginX={12}
              height="100%"
            >
              <TabPanels>
                <TabPanel>
                  <Flex
                    width="100%"
                    alignItems="center"
                    justify="center"
                    flexDirection="column"
                  >
                    <QuestionInputField
                      inputValues={questionInputValues}
                      setInputValues={setQuestionInputValues}
                      isCreate={isCreate}
                      setIsCreate={setIsCreate}
                      colorMode={colorMode}
                    />
                    <Questions
                      inputValues={questionInputValues}
                      setInputValues={setQuestionInputValues}
                      isCreate={isCreate}
                      setIsCreate={setIsCreate}
                      colorMode={colorMode}
                    />
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex
                    width="100%"
                    alignItems="center"
                    justify="center"
                    flexDirection="column"
                  >
                    <UserInputField
                      userInputValues={userInputValues}
                      setUserInputValues={setUserInputValues}
                      colorMode={colorMode}
                      isCreate={isCreate}
                      setIsCreate={setIsCreate}
                    />

                    <Users
                      userInputValues={userInputValues}
                      setUserInputValues={setUserInputValues}
                      isCreate={isCreate}
                      setIsCreate={setIsCreate}
                      colorMode={colorMode}
                    />
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Collaboration />
                </TabPanel>
              </TabPanels>
            </Flex>
          </Flex>
        </Flex>
      </Tabs>
    </Box>
  );
};

export default IndexPage;
