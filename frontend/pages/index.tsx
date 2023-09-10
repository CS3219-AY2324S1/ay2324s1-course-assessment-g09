import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import InputField from "../components/InputField";
import Questions from "../components/Questions";

const IndexPage = () => {
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Flex
        flexDirection="column"
        align="center"
        background="gray.300"
        p={6}
        borderRadius="xl"
        height="80%"
        marginX={16}
      >
        <InputField />

        <Grid
          templateColumns="repeat(6, 1fr)"
          width="100%"
          marginTop={8}
          paddingX={12}
        >
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
              <Text fontWeight="bold">Question Description</Text>
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

        <Flex width="100%" alignItems="center" justify="center">
          <Questions />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default IndexPage;
