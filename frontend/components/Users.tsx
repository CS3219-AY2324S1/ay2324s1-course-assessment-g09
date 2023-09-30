import { Box } from "@chakra-ui/react";
import React from "react";
import UserHeader from "./UserHeader";
import User from "./User";

const Users = ({
  userInputValues,
  setUserInputValues,
  isCreate,
  setIsCreate,
  colorMode,
}) => {
  return (
    <Box width="100%" marginX={12}>
      <UserHeader />
      <User
        userInputValues={userInputValues}
        setUserInputValues={setUserInputValues}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        colorMode={colorMode}
      />
    </Box>
  );
};

export default Users;
