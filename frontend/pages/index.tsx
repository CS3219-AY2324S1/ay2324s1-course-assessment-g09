import React from "react";
import ToggleMode from "../components/ToggleMode";
import { Box, useColorMode, Text, VStack, Flex } from "@chakra-ui/react";
import Dashboard from "./dashboard";

const LandingPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box height="100vh" width="100%" p={1} m={0}>
      {/* Toggle Bar */}
      <Flex justifyContent="flex-end" mt={2} width="100%" height="5%">
        <ToggleMode colorMode={colorMode} toggleColorMode={toggleColorMode} />
      </Flex>

      {/* Actual Dashboard */}
      <Box height="90%" my={5} mx={5}>
        <Dashboard />
      </Box>
    </Box>
  );
};

export default LandingPage;
