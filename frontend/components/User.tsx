import { Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const User = ({
  userInputValues,
  setUserInputValues,
  isCreate,
  setIsCreate,
  colorMode,
}) => {
  const [users, setUsers] = useState(null);

  const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;

  const fetchUsers = async () => {
    try {
      // const res = await axios.get(`${IP_ADDRESS}:3002/users/getall`);
      const res = await axios.get(`user_service/users/getUser`);
      console.log(res);
      setUsers(res.data.users);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = async ({ _id, id, name }) => {
    setUserInputValues({
      _id,
      user_id: id,
      name,
    });
    setIsCreate(false);
  };

  const handleDelete = async ({ username, name }) => {
    console.log(username, name);
    try {
      await axios.post(`user_service/users/getUser`, {
        username,
        name,
      });
      if (users.LENGTH > 0) {
        fetchUsers();
      }
      // console.log("LENGTH", users.LENGTH);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      {users &&
        users.map((user, index) => (
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
                {user.username}
              </Flex>
            </GridItem>
            <GridItem key={`grid_item_title${user.name}`} pl={2}>
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                height="100%"
                key={`flex_title_${user.name}`}
              >
                {user.name}
              </Flex>
            </GridItem>

            <GridItem pl={2}>
              <Flex justifyContent="center" alignItems="center" height="100%">
                <Button
                  size="sm"
                  my={1}
                  bgColor={colorMode === "light" ? "yellow.400" : "yellow.300"}
                  color="black"
                  mx={1}
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  my={1}
                  bgColor={colorMode === "light" ? "orange.400" : "orange.300"}
                  color="black"
                  mx={1}
                  onClick={() => handleDelete(user)}
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

export default User;
