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
  Text,
} from "@chakra-ui/react";
import CreateCustomRoom from "./CreateCustomRoom";
import JoinCustomRoom from "./JoinCustomRoom";
import { useState } from "react";
import matchSocketManager from "./Sockets/MatchSocketManager";

export default function CustomRoomButton({ roomCreated, setRoomCreated }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customRoom, setCustomRoom] = useState("");
  const handleLeaveRoom = () => {
    onClose();
    setRoomCreated(false);
    console.log(customRoom);
    matchSocketManager.emitEvent("leaveQueue", {
      condition: customRoom,
      socketId: matchSocketManager.getSocketId(),
    });
  };

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
          {roomCreated ? (
            <ModalHeader fontSize={{ lg: "md", xl: "md", "2xl": "xl" }}>
              Room Created
            </ModalHeader>
          ) : (
            <ModalHeader fontSize={{ lg: "md", xl: "md", "2xl": "xl" }}>
              Custom Room
            </ModalHeader>
          )}

          <ModalBody width="100%" height="100%">
            {roomCreated ? (
              <Text>
                Room has been created. Awaiting the other user to join...
              </Text>
            ) : (
              <HStack height="90%">
                <CreateCustomRoom setRoomCreated={setRoomCreated} setCustomRoom={setCustomRoom} />

                <Center height="200px">
                  <Divider orientation="vertical" />
                </Center>
                <JoinCustomRoom />
              </HStack>
            )}
          </ModalBody>

          <ModalFooter>
            {roomCreated ? (
              <Center>
                <Button colorScheme="orange" mr={3} onClick={handleLeaveRoom}>
                  Leave Room
                </Button>
              </Center>
            ) : (
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
