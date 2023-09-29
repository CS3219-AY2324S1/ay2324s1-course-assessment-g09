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

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3002/users");
      setUsers(res.data.questions);
    } catch (error) {
      console.log("ERROR: ", error);
    }

    useEffect(() => {
      fetchUsers();
    });
  };

  const handleEdit = async ({ _id, user_id, name }) => {
    setUserInputValues({
      _id,
      user_id,
      name,
    });
    setIsCreate(false);
  };

  const deleteQuestion = async ({ _id, user_id, name }) => {
    await axios.delete(`http://localhost:3002/users/${_id}`);
    fetchUsers();
  };

  return (
    <>
      {users &&
        users.map((user) => (
          <Grid templateColumns="repeat(3, 1fr)" key={`grid_${user.user_id}`}>
            <GridItem border="1px solid" key={`grid_item_id_${user.user_id}`}>
              <Flex
                justifyContent="center"
                alignItems="center"
                height="100%"
                key={`flex_id_${user.user_id}`}
              >
                {user.user_id}
              </Flex>
            </GridItem>
            <GridItem border="1px solid" key={`grid_item_title${user.name}`}>
              <Flex
                justifyContent="center"
                alignItems="center"
                height="100%"
                key={`flex_title_${user.name}`}
              >
                {user.name}
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
                  onClick={() => deleteQuestion(user)}
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
