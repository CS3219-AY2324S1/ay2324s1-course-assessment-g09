import { HStack, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdQuestionAnswer } from "react-icons/md";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const ToggleMode = ({
  colorMode,
  toggleColorMode,
  toggleDisplayDB,
  displayDB,
}) => {
  return (
    <HStack my={2} mr={5}>
      {/* {displayDB === "questions" ? (
        <IconButton
          variant="outline"
          colorScheme="blue"
          icon={<AiOutlineUser />}
          aria-label="users"
          boxSize={10}
          onClick={toggleDisplayDB}
        />
      ) : (
        <IconButton
          variant="outline"
          colorScheme="pink"
          icon={<MdQuestionAnswer />}
          aria-label="questions"
          boxSize={10}
          onClick={toggleDisplayDB}
        />
      )} */}

      {colorMode === "light" ? (
        <IconButton
          variant="outline"
          icon={<BsFillSunFill />}
          colorScheme="orange"
          boxSize={10}
          onClick={toggleColorMode}
          aria-label="light"
        />
      ) : (
        <IconButton
          variant="outline"
          colorScheme="yellow"
          boxSize={10}
          onClick={toggleColorMode}
          icon={<BsFillMoonFill />}
          aria-label="dark"
        />
      )}
    </HStack>
  );
};

export default ToggleMode;
