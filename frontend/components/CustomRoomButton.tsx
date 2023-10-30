import {
	Button,
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
			<Button onClick={onOpen}>Custom Room</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Custom Room</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<HStack>
							<CreateCustomRoom />
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
