import {
  Grid,
  GridItem,
  Flex,
  Text,
  Icon,
  Menu,
  Box,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";
const QuestionsHeader = ({ userMode, complexity, setComplexity }) => {
  const { colorMode } = useColorMode();

  const handleChangeComplexity = (chosenComplexity) => {
    setComplexity(chosenComplexity);
  };

  const complexityColor = {
    Easy: {
      light: "grren.500",
      dark: "green.300",
    },
    Medium: {
      light: "orange.500",
      dark: "orange.300",
    },
    Hard: {
      light: "red.500",
      dark: "red.300",
    },
  };

  return (
    <Grid
      templateColumns={
        userMode == "admin" ? "repeat(13, 1fr)" : "repeat(11, 1fr)"
      }
      width="100%"
      height="fit-content"
    >
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
        <Flex justifyContent="flex-start" alignItems="center">
          <Text
            fontWeight="bold"
            pl={2}
            pb={1}
            textColor={complexity && complexityColor[complexity][colorMode]}
          >
            Complexity {complexity}
          </Text>
          <Menu>
            <MenuButton as={Box}>
              <Icon as={BsFilter} boxSize="20px" ml={2} />
            </MenuButton>
            <MenuList>
              <MenuItem
                fontWeight="semibold"
                onClick={() => handleChangeComplexity("")}
              >
                None
              </MenuItem>
              <MenuItem
                // textColor={colorMode == "light" ? "green.500" : "green.300"}
                textColor={complexityColor["Easy"][colorMode]}
                fontWeight="semibold"
                onClick={() => handleChangeComplexity("Easy")}
              >
                Easy
              </MenuItem>
              <MenuItem
                // textColor={colorMode == "light" ? "orange.500" : "orange.300"}
                textColor={complexityColor["Medium"][colorMode]}
                fontWeight="semibold"
                onClick={() => handleChangeComplexity("Medium")}
              >
                Medium
              </MenuItem>
              <MenuItem
                // textColor={colorMode == "light" ? "red.500" : "red.300"}
                textColor={complexityColor["Hard"][colorMode]}
                fontWeight="semibold"
                onClick={() => handleChangeComplexity("Hard")}
              >
                Hard
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </GridItem>
      {userMode == "admin" && (
        <GridItem borderBottom="1px solid" mr={2} colSpan={2}>
          <Flex justifyContent="flex-start">
            <Text fontWeight="bold" pl={2} pb={1}>
              Action
            </Text>
          </Flex>
        </GridItem>
      )}
    </Grid>
  );
};

export default QuestionsHeader;
