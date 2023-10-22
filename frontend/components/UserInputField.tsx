import { Grid, Input, Button, Flex, Icon, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

const UserInputField = ({
  userInputValues,
  setUserInputValues,
  colorMode,
  isCreate,
  setIsCreate,
}) => {
  const [users, setUsers] = useState(null);

  const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

  const fetchUsers = async () => {
    const res = await axios.get(`${IP_ADDRESS}:3002/users/getall`);
    console.log(res.data);
    setUsers(res.data.users);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInputValues({
      ...userInputValues,
      [name]: value,
    });
  };

  const isButtonValid = () => {
    return (
      userInputValues.user_id.trim() !== "" &&
      userInputValues.name.trim() !== ""
    );
  };

  const handleUpdate = async () => {
    const { _id } = userInputValues;
    await axios.post(
      `${IP_ADDRESS}:3002/users/update/${userInputValues.id}`,
      userInputValues
    );

    setUserInputValues({
      user_id: "",
      name: "",
    });

    setIsCreate(true);
    fetchUsers();
  };

  const handleSubmit = async () => {
    const res = await axios.post(`${IP_ADDRESS}:3002/users/create`, {
      user_id: userInputValues.user_id,
      name: userInputValues.name,
    });

    setUserInputValues({
      user_id: "",
      name: "",
    });

    fetchUsers();
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={2}>
      <Input
        placeholder="ID"
        variant="filled"
        name="user_id"
        value={userInputValues.user_id}
        onChange={handleInputChange}
      />
      <Input
        placeholder="Title"
        variant="filled"
        name="name"
        value={userInputValues.name}
        onChange={handleInputChange}
      />
      {isCreate ? (
        <Button
          mb={3}
          colorScheme={colorMode === "light" ? "green" : "teal"}
          isDisabled={!isButtonValid()}
          type="submit"
          onClick={handleSubmit}
        >
          <Flex align="center">
            <Icon as={IoMdAdd} mr={1} />
            <Text>Create</Text>
          </Flex>
        </Button>
      ) : (
        <Button
          mb={3}
          colorScheme={colorMode === "light" ? "pink" : "purple"}
          onClick={handleUpdate}
        >
          <Flex align="center">
            <Icon as={AiTwotoneEdit} mr={1} />
            <Text>Update</Text>
          </Flex>
        </Button>
      )}
    </Grid>
  );
};

export default UserInputField;
