import { Grid, GridItem, Flex, Text } from "@chakra-ui/react";
import React from "react";

const UserHeader = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" width="100%" marginTop={8}>
      <GridItem border="2px solid" borderRight="1px solid">
        <Flex justifyContent="center">
          <Text fontWeight="bold">User ID</Text>
        </Flex>
      </GridItem>
      <GridItem border="2px solid" borderRight="1px solid">
        <Flex justifyContent="center">
          <Text fontWeight="bold">Name</Text>
        </Flex>
      </GridItem>
      <GridItem border="2px solid" borderRight="1px solid">
        <Flex justifyContent="center">
          <Text fontWeight="bold">Action</Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default UserHeader;
