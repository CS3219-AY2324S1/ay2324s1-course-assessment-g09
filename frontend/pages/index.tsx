import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";

const IndexPage = () => (
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
      {/* Input field and button */}
      <Grid templateColumns="repeat(6, 1fr)" gap={6} marginX={5}>
        <Input placeholder="ID" variant="filled" />
        <Input placeholder="Title" variant="filled" />
        <Input placeholder="Description" variant="filled" />
        <Input placeholder="Category" variant="filled" />
        <Input placeholder="Complexity" variant="filled" />
        <Button mb={3} colorScheme="green">
          <Flex align="center">
            <Icon as={IoMdAdd} mr={1} />
            <Text>Create</Text>
          </Flex>
        </Button>
      </Grid>

      <Grid
        templateColumns="repeat(5, 1fr)"
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
        <GridItem border="2px solid">
          <Flex justifyContent="center">
            <Text fontWeight="bold">Question Complexity</Text>
          </Flex>
        </GridItem>
      </Grid>
      <Flex height="100%" marginTop={10} align="center">
        <Text>Table Data Goes Here</Text>
      </Flex>
    </Flex>
  </Flex>
);

export default IndexPage;
