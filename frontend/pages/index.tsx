import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import InputField from "../components/InputField";
import Questions from "../components/Questions";
import { useState } from "react";

const IndexPage = () => {
  const [inputValues, setInputValues] = useState({
    edit_id: "",
    question_id: "",
    title: "",
    description: "",
    category: "",
    complexity: "",
  });

  const [isCreate, setIsCreate] = useState(true);

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
        <InputField
          inputValues={inputValues}
          setInputValues={setInputValues}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
        />

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
          <Questions
            inputValues={inputValues}
            setInputValues={setInputValues}
            isCreate={isCreate}
            setIsCreate={setIsCreate}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default IndexPage;
