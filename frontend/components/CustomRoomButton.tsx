import {
  Button,
  Center,
  Divider,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import CreateCustomRoom from "./CreateCustomRoom";
import JoinCustomRoom from "./JoinCustomRoom";

export default function CustomRoomButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="yellow"
        size={{ lg: "sm", xl: "sm", "2xl": "lg" }}
      >
        Custom Room
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={{ lg: "md", xl: "md", "2xl": "xl" }}>
            Custom Room
          </ModalHeader>

          <ModalBody width="100%" height="100%">
            <HStack height="90%">
              <CreateCustomRoom />

              <Center height="200px">
                <Divider orientation="vertical" />
              </Center>
              <JoinCustomRoom />
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
