import {
  Box,
  Button,
  Flex,
  Icon,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Questions from "../../components/Questions";
import QuestionInputField from "../../components/QuestionsInputField";
import ToggleMode from "../../components/ToggleMode";
import UserInputField from "../../components/UserInputField";
import Users from "../../components/Users";
import { AiOutlineUser } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { useRouter } from "next/router";
import Collaboration from "../collaboration";
import MatchingPage from "../../components/Matching/MatchingPage";
import axios from "axios";

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

const IndexPage = () => {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();
  const [questions, setQuestions] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [user, setUserRole] = useState("admin");
  const [userSearchQuery, setUserSearchQuery] = useState("");

  const [questionInputValues, setQuestionInputValues] = useState({
    edit_id: "",
    qn_num: "",
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

  const [role, setRole] = useState("user");

  useEffect(() => {
    const login = JSON.parse(window.sessionStorage.getItem("login"));

    if (login && login.isLoggedIn) {
      setRole(login.role);
    } else {
      router.push("/signin");
    }
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`question_service/questions`);
      console.log(res);

      setQuestions(res.data.qns);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };
  const fetchUsers = async () => {
    try {
      // const res = await axios.get(`${IP_ADDRESS}:3002/users/getall`);
      const res = await axios.get(`user_service/users/getUser`);

      setUsers(res.data.users);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchUsers();
  }, []);

  const [users, setUsers] = useState(null);

  const handleSignOut = () => {
    axios
      .post(`auth_service/userauth/signout`, {}, { withCredentials: true })
      .then((response) => {
        if (response.statusText === "OK") {
          router.push("/signin");
          window.sessionStorage.removeItem("login");
        }
      })
      .catch((error) => {
        console.log("signout", error);
      });
  };

  const handleCheckboxChange = (changedCategory: any) => {
    setSelectedCategory((previouslySelectedCategory) =>
      previouslySelectedCategory.includes(changedCategory)
        ? previouslySelectedCategory.filter((item) => item !== changedCategory)
        : [...previouslySelectedCategory, changedCategory]
    );
  };

  return (
    <Box height="100vh" width="100%" display="flex" flexDirection="column">
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
            Matching Service
          </Tab>
          <div style={{ marginLeft: "auto" }}>
            <ToggleMode
              colorMode={colorMode}
              toggleColorMode={toggleColorMode}
            />
          </div>
          <div>
            <Button onClick={handleSignOut} colorScheme="red" my={2} mr={5}>
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
                      setQuestions={setQuestions}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <Questions
                      inputValues={questionInputValues}
                      setInputValues={setQuestionInputValues}
                      isCreate={isCreate}
                      setIsCreate={setIsCreate}
                      colorMode={colorMode}
                      userMode={user}
                      questions={questions}
                      fetchQuestions={fetchQuestions}
                      setSelectedCategory={setSelectedCategory}
                      selectedCategory={selectedCategory}
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
                      userSearchQuery={userSearchQuery}
                      setUserSearchQuery={setUserSearchQuery}
                    />

                    <Users
                      userInputValues={userInputValues}
                      setUserInputValues={setUserInputValues}
                      isCreate={isCreate}
                      setIsCreate={setIsCreate}
                      colorMode={colorMode}
                      userSearchQuery={userSearchQuery}
                      fetchUsers={fetchUsers}
                      users={users}
                    />
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex
                    width="100%"
                    alignItems="center"
                    justify="center"
                    flexDirection="column"
                    flex="1"
                  >
                    <Collaboration />
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex
                    width="100%"
                    alignItems="center"
                    justify="center"
                    flex="1"
                  >
                    <MatchingPage />
                    <MatchingPage />
                  </Flex>
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
