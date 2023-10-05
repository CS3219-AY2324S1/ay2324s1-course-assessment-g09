import { Grid, GridItem, Flex, Text } from "@chakra-ui/react";
import React from "react";

const QuestionsHeader = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" width="100%" marginTop={8}>
      <GridItem border="2px solid" borderRight="1px solid">
        <Flex justifyContent="center">
          <Text fontWeight="bold">Question ID</Text>
        </Flex>
      </GridItem>
      <GridItem border="2px solid" borderRight="1px solid">
        <Flex justifyContent="center">
          <Text fontWeight="bold">Question Title</Text>
        </Flex>
      </GridItem>
      <GridItem border="2px solid" borderRight="1px solid">
        <Flex justifyContent="center">
          <Text fontWeight="bold">Question Category</Text>
        </Flex>
      </GridItem>
      <GridItem border="2px solid" borderRight="1px solid">
        <Flex justifyContent="center">
          <Text fontWeight="bold">Question Complexity</Text>
        </Flex>
      </GridItem>
      <GridItem border="2px solid">
        <Flex justifyContent="center">
          <Text fontWeight="bold">Action</Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default QuestionsHeader;
