import { Grid, GridItem, Flex, Text } from "@chakra-ui/react";
import React from "react";

const QuestionsHeader = () => {
  return (
    <Grid templateColumns="repeat(13, 1fr)" width="100%" marginTop={5}>
      <GridItem borderBottom="1px solid" colSpan={1}>
        <Flex justifyContent="flex-start">
          <Text fontWeight="bold" pl={2} pb={1}>
            ID
          </Text>
        </Flex>
      </GridItem>
      <GridItem borderBottom="1px solid" colSpan={4}>
        <Flex justifyContent="flex-start">
          <Text fontWeight="bold" pl={2} pb={1}>
            Title
          </Text>
        </Flex>
      </GridItem>
      <GridItem borderBottom="1px solid" colSpan={4}>
        <Flex justifyContent="flex-start">
          <Text fontWeight="bold" pl={2} pb={1}>
            Category
          </Text>
        </Flex>
      </GridItem>
      <GridItem borderBottom="1px solid" colSpan={2}>
        <Flex justifyContent="flex-start">
          <Text fontWeight="bold" pl={2} pb={1}>
            Complexity
          </Text>
        </Flex>
      </GridItem>
      <GridItem borderBottom="1px solid" mr={2} colSpan={2}>
        <Flex justifyContent="flex-start">
          <Text fontWeight="bold" pl={2} pb={1}>
            Action
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default QuestionsHeader;
