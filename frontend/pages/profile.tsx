import {
  Avatar,
  Divider,
  VStack,
  WrapItem,
  Text,
  HStack,
  Button,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import QuestionProgress from "./questionProgress";

const profile = ({ colorMode }) => {
  return (
    <VStack>
      <WrapItem>
        <Avatar
          size={{ lg: "lg", xl: "lg", "2xl": "xl" }}
          name="Wilson Ng"
          bg={colorMode == "light" ? "cyan.500" : "cyan.700"}
        />
      </WrapItem>
      <Text
        fontSize={{ lg: "xl", xl: "xl", "2xl": "2xl" }}
        color={colorMode == "light" ? "black" : "white"}
        fontWeight="semibold"
      >
        Wilson Ng Jing An
      </Text>
      <Text
        fontSize={{ lg: "md", xl: "md", "2xl": "lg" }}
        color={colorMode == "light" ? "black" : "white"}
        fontFamily="monospace"
        fontWeight="bold"
      >
        @wilsonngja{" "}
        <Badge
          variant="outline"
          colorScheme="purple"
          fontSize={{ lg: "md", xl: "md", "2xl": "lg" }}
        >
          User
        </Badge>
      </Text>
      <Divider />
      <HStack mt={{ lg: 2, xl: 4, "2xl": 5 }}>
        <Button colorScheme="purple" size={{ lg: "sm", xl: "sm", "2xl": "lg" }}>
          Quick Start
        </Button>
        <Button colorScheme="blue" size={{ lg: "sm", xl: "sm", "2xl": "lg" }}>
          Custom Room
        </Button>
        <Button colorScheme="red" size={{ lg: "sm", xl: "sm", "2xl": "lg" }}>
          Log Out{" "}
        </Button>
      </HStack>
    </VStack>
  );
};

export default profile;
