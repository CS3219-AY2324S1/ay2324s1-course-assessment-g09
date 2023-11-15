import { Grid, GridItem, Flex, Text } from "@chakra-ui/react";
import React from "react";

const UserHeader = () => {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      width="100%"
      marginTop={5}
      height="8%"
    >
      <GridItem borderBottom="1px solid" pl={2}>
        <Flex justifyContent="flex-start">
          <Text fontWeight="bold">User ID</Text>
        </Flex>
      </GridItem>
      <GridItem borderBottom="1px solid" pl={2}>
        <Flex justifyContent="flex-start">
          <Text fontWeight="bold">Name</Text>
        </Flex>
      </GridItem>
      <GridItem borderBottom="1px solid" pl={2}>
        <Flex justifyContent="flex-start">
          <Text fontWeight="bold">Role</Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default UserHeader;
