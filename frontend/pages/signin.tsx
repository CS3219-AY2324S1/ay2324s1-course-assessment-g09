"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  VStack,
  Box,
  Heading,
  Highlight,
  HStack,
  Link,
  Text,
  useColorMode,
  Center,
  AbsoluteCenter,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import ToggleMode from "../components/ToggleMode";
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { MdPassword } from "react-icons/md";

const SignUp = () => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (sessionStorage.getItem("login")) {
      const eToken = JSON.parse(sessionStorage.getItem("login")).token;
      if (eToken) {
        router.push("/");
      }
    }
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();
  const [viewPasswordField, setViewPasswordField] = useState("invisible");

  const color = colorMode == "light" ? "teal.200" : "teal.100";
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      var eToken = "";
      if (sessionStorage.getItem("login")) {
        eToken = JSON.parse(sessionStorage.getItem("login")).token;
      }
      const response = await fetch("http://localhost:3002/auth/signin", {
        method: "POST",
        headers: {
          Authorization: eToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const result = await response.json();
      // console.log("result", result);
      if (response.ok) {
        sessionStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: result.token,
            role: result.role,
          })
        );

        toast({
          position: "bottom-left",
          render: () => (
            <Box
              color="white"
              bg="green.300"
              textAlign="center"
              padding="10px"
              rounded="md"
            >
              Welcome to PeerPrep, {}
            </Box>
          ),
        });
        router.push("/");
      } else {
        toast({
          position: "bottom-left",
          render: () => (
            <Box
              color="white"
              bg="red.300"
              textAlign="center"
              padding="10px"
              rounded="md"
            >
              {result.message}
            </Box>
          ),
        });
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const toggleView = () => {
    if (viewPasswordField == "invisible") {
      setViewPasswordField("visible");
    } else {
      setViewPasswordField("invisible");
    }
  };

  return (
    <Box height="100vh">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ToggleMode colorMode={colorMode} toggleColorMode={toggleColorMode} />
      </div>
      <AbsoluteCenter>
        <VStack
          display="flex"
          width="100vw"
          align="center"
          justifyContent="center"
          spacing="50px"
          flex="1"
        >
          <Box textAlign="center">
            <Heading>
              <Highlight
                query="PeerPrep"
                styles={{
                  px: "2",
                  py: "1",
                  rounded: "full",
                  bg: color,
                }}
              >
                Login to PeerPrep
              </Highlight>
            </Heading>
          </Box>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} width="25vw">
              <FormControl>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={AiOutlineMail} boxSize={5} />
                  </InputLeftElement>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@peerprep.com"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={MdPassword} boxSize={5} />
                  </InputLeftElement>
                  <InputRightElement>
                    <Icon
                      as={
                        viewPasswordField == "invisible"
                          ? AiFillEye
                          : AiFillEyeInvisible
                      }
                      onClick={toggleView}
                      boxSize={5}
                      _hover={{ cursor: "pointer" }}
                    />
                  </InputRightElement>
                  <Input
                    name="password"
                    type={
                      viewPasswordField == "invisible" ? "password" : "text"
                    }
                  />
                </InputGroup>
              </FormControl>

              {/* <InputGroup>
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input type="text" placeholder="Username" />
              </InputGroup> */}

              <HStack>
                <Link href="/signup" width="7vw">
                  <Button colorScheme="green">Create account</Button>
                </Link>

                <Button type="submit" marginLeft="13vw" colorScheme="blue">
                  Login
                </Button>
              </HStack>
            </VStack>
          </form>
        </VStack>
      </AbsoluteCenter>
    </Box>
  );
};

export default SignUp;
