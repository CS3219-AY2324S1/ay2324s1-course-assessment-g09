import {
  Badge,
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
  useDisclosure,
  Text,
  Input,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { title } from "process";
import React, { useEffect, useState } from "react";
import CategoryTag from "./CategoryTag";

const User = ({
  userInputValues,
  setUserInputValues,
  isCreate,
  setIsCreate,
  colorMode,
  userSearchQuery,
  fetchUsers,
  users,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openUser, setOpenUser] = useState(null);

  const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleCancelEdit = async () => {
    setIsEditing(false);
  };

  const handleSubmitEdit = async ({
    id,
    email,
    name,
    username,
    // password,
    role,
  }) => {
    console.log("Submitted");
    console.log(id, email, name, username, role);
    try {
      await axios.put(`auth_service/userauth/updateUser`, {
        id,
        email: "abc" + email,
        name,
        username,
        // password:
        //   "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS",
        role,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // This is the main part you are interested in
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }

    setIsEditing(false);
  };

  const handleDelete = async ({ id }) => {
    try {
      await axios.delete(`user_service/users/deleteUser/${id}`);
      fetchUsers();
      // console.log(users.LENGTH);
      // if (users.LENGTH > 0) {
      //   fetchUsers();
      // }
      onClose();
      setOpenUser(null);
      setIsEditing(false);
      // console.log("LENGTH", users.LENGTH);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleClose = () => {
    onClose();
    setOpenUser(null);
    setIsEditing(false);
  };

  const handleModal = (user) => {
    console.log(user);
    setUser(user.name);
    setUsername(user.username);
    setRole(user.role);
    setEmail(user.email);

    if (openUser === user) {
      if (isOpen) {
        onClose(); // Close the modal if it's open
      }
    } else {
      console.log();
      setOpenUser(user);
      onOpen(); // Open the modal if it's closed
    }
  };

  return (
    <>
      {users &&
        users
          .filter(
            (user) =>
              user.username.includes(userSearchQuery) ||
              user.name.includes(userSearchQuery)
          )
          .map((user, index) => (
            <Grid
              templateColumns="repeat(3, 1fr)"
              key={`grid_${user.username}`}
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
              <GridItem key={`grid_item_id_${user.username}`} pl={2}>
                <Flex
                  justifyContent="flex-start"
                  alignItems="center"
                  height="100%"
                  key={`flex_id_${user.username}`}
                >
                  <Text>{user.username}</Text>
                </Flex>
              </GridItem>
              <GridItem key={`grid_item_title${user.name}`} pl={2}>
                <Flex
                  justifyContent="flex-start"
                  alignItems="center"
                  height="100%"
                  key={`flex_title_${user.name}`}
                >
                  <Text
                    _hover={{
                      color: colorMode == "light" ? "teal.500" : "teal.300",
                      fontWeight: "extrabold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleModal(user)}
                  >
                    {user.name}
                  </Text>
                </Flex>
              </GridItem>

              <GridItem pl={2}>
                <Flex
                  justifyContent="flex-start"
                  alignItems="center"
                  height="100%"
                  key={`flex_id_${user.role}`}
                >
                  <Badge colorScheme={user.role == "admin" ? "red" : "green"}>
                    {user.role}
                  </Badge>

                  {/* <Button
                    size="sm"
                    my={1}
                    bgColor={
                      colorMode === "light" ? "yellow.400" : "yellow.300"
                    }
                    color="black"
                    mx={1}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    my={1}
                    bgColor={
                      colorMode === "light" ? "orange.400" : "orange.300"
                    }
                    color="black"
                    mx={1}
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </Button> */}
                </Flex>
              </GridItem>
            </Grid>
          ))}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="lg"
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>User Page</ModalHeader>

          <ModalBody maxHeight="60vh" overflowY="auto" mx={5}>
            {/* Email */}
            <HStack my={3}>
              <Text fontWeight="bold">Email: </Text>

              {isEditing ? (
                <Input variant="flushed" size="sm" value={email} />
              ) : (
                <Text>{email}</Text>
              )}
            </HStack>

            {/* Username */}
            <HStack my={3}>
              <Text fontWeight="bold">Username: </Text>

              {isEditing ? (
                <Input variant="flushed" size="sm" value={username} />
              ) : (
                <Text>{username}</Text>
              )}
            </HStack>

            {/* Role */}
            <HStack my={3}>
              <Text fontWeight="bold">Role: </Text>{" "}
              {isEditing ? (
                <Input variant="flushed" size="sm" value={role} />
              ) : (
                <Badge colorScheme={role == "admin" ? "red" : "green"}>
                  {role}
                </Badge>
              )}
            </HStack>
          </ModalBody>

          <ModalFooter>
            {isEditing ? (
              <Button
                bgColor={colorMode === "light" ? "orange.400" : "orange.300"}
                color="black"
                mx={1}
                onClick={() => handleCancelEdit()}
              >
                Cancel
              </Button>
            ) : (
              <Button
                bgColor={colorMode === "light" ? "yellow.400" : "yellow.300"}
                color="black"
                mx={1}
                onClick={() => handleEdit()}
              >
                Edit
              </Button>
            )}

            {isEditing ? (
              <Button
                bgColor={colorMode === "light" ? "green.400" : "green.300"}
                color="black"
                mx={1}
                onClick={() => handleSubmitEdit(openUser)}
              >
                Submit
              </Button>
            ) : (
              <Button
                bgColor={colorMode === "light" ? "orange.400" : "orange.300"}
                color="black"
                mx={1}
                onClick={() => handleDelete(openUser)}
              >
                Delete
              </Button>
            )}

            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default User;
