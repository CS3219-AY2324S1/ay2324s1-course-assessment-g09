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
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Menu,
  MenuButton,
  MenuList,
  MenuIcon,
  MenuItem,
} from "@chakra-ui/react";
import axios from "axios";
import { title } from "process";
import React, { useEffect, useState } from "react";
import CategoryTag from "./CategoryTag";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
  const {
    isOpen: isDialogOpen,
    onOpen: openDialog,
    onClose: closeDialog,
  } = useDisclosure();
  const [openUser, setOpenUser] = useState(null);
  const cancelRef = React.useRef();

  const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [editUserInputValues, setEditUserInputValues] = useState({
    email: "",
    user: "",
    username: "",
    role: "",
  });

  const handleEditInputChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    console.log(name, value);
    setEditUserInputValues({
      ...editUserInputValues,
      [name]: value,
    });
  };

  const handleRoleClick = (role) => {
    setEditUserInputValues({
      ...editUserInputValues,
      role,
    });
  };

  const handleEdit = async ({ email, username, role, name }) => {
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
      await axios.put(`user_service/users/updateUser`, {
        id,
        email: editUserInputValues.email,
        name: editUserInputValues.user,
        username: editUserInputValues.username,
        // password:
        //   "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS",
        role: editUserInputValues.role,
      });
      fetchUsers();
      handleClose();
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
      closeDialog();
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

  useEffect(() => {
    console.log(editUserInputValues);
  }, [editUserInputValues]);

  const handleModal = (selectedUser) => {
    console.log(selectedUser);
    setUser(selectedUser.name);
    setUsername(selectedUser.username);
    setRole(selectedUser.role);
    setEmail(selectedUser.email);
    setEditUserInputValues({
      email: selectedUser.email,
      user: selectedUser.name,
      username: selectedUser.username,
      role: "",
    });
    console.log(email, user, username, role);

    if (openUser === user) {
      if (isOpen) {
        onClose(); // Close the modal if it's open
      }
    } else {
      console.log();
      setOpenUser(selectedUser);
      onOpen(); // Open the modal if it's closed
    }
  };

  return (
    <Box
      height="85%"
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
                  <Text
                    _hover={{
                      color: colorMode == "light" ? "teal.500" : "teal.300",
                      fontWeight: "extrabold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleModal(user)}
                  >
                    {user.username}
                  </Text>
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
                <Input
                  variant="flushed"
                  size="sm"
                  name="email"
                  value={editUserInputValues.email}
                  onChange={handleEditInputChange}
                />
              ) : (
                <Text>{email}</Text>
              )}
            </HStack>

            {/* Name */}
            <HStack my={3}>
              <Text fontWeight="bold">Name: </Text>

              {isEditing ? (
                <Input
                  variant="flushed"
                  size="sm"
                  name="user"
                  value={editUserInputValues.user}
                  onChange={handleEditInputChange}
                />
              ) : (
                <Text>{user}</Text>
              )}
            </HStack>

            {/* Username */}
            <HStack my={3}>
              <Text fontWeight="bold">Username: </Text>

              {isEditing ? (
                <Input
                  variant="flushed"
                  size="sm"
                  value={editUserInputValues.username}
                  name="username"
                  onChange={handleEditInputChange}
                />
              ) : (
                <Text>{username}</Text>
              )}
            </HStack>

            {/* Role */}
            <HStack my={3}>
              <Text fontWeight="bold">Role: </Text>{" "}
              {isEditing ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme={
                      editUserInputValues.role == ""
                        ? openUser.role == "user"
                          ? "green"
                          : "red"
                        : editUserInputValues.role == "user"
                        ? "green"
                        : "red"
                    }
                    fontWeight="bold"
                  >
                    {editUserInputValues.role == ""
                      ? openUser.role == "user"
                        ? "User"
                        : "Admin"
                      : editUserInputValues.role == "user"
                      ? "User"
                      : "Admin"}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => handleRoleClick("user")}
                      color={colorMode == "light" ? "green.500" : "green.300"}
                      fontWeight="bold"
                    >
                      User
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleRoleClick("admin")}
                      color={colorMode == "light" ? "red.500" : "red.300"}
                      fontWeight="bold"
                    >
                      Admin
                    </MenuItem>
                  </MenuList>
                </Menu>
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
                onClick={() => handleEdit(openUser)}
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
                onClick={openDialog}
                // onClick={() => handleDelete(openUser)}
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

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this user? This action can't be
              reversed.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => handleDelete(openUser)}
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

export default User;
