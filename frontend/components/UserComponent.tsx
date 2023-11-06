import { Box, Flex, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import UserInputField from "./UserInputField";
import Users from "./Users";

const UserComponent = ({
  userInputValues,
  setUserInputValues,
  isCreateUser,
  setIsCreateUser,
  fetchUsers,
  users,
}) => {
  const { colorMode } = useColorMode();
  const [userSearchQuery, setUserSearchQuery] = useState("");

  return (
    <Flex
      marginTop={5}
      alignItems="center"
      justifyContent="flex-start"
      flexDirection="column"
      width="90%"
      height="100%"
    >
      <UserInputField
        userInputValues={userInputValues}
        setUserInputValues={setUserInputValues}
        colorMode={colorMode}
        isCreate={isCreateUser}
        setIsCreate={setIsCreateUser}
        userSearchQuery={userSearchQuery}
        setUserSearchQuery={setUserSearchQuery}
      />

      <Users
        userInputValues={userInputValues}
        setUserInputValues={setUserInputValues}
        isCreate={isCreateUser}
        setIsCreate={setIsCreateUser}
        colorMode={colorMode}
        userSearchQuery={userSearchQuery}
        fetchUsers={fetchUsers}
        users={users}
      />
    </Flex>
  );
};

export default UserComponent;
