import { Button } from "@chakra-ui/react";

export default function SaveHistoryButton(code, language, difficulty, theme) {
	const handleHistory = () => {};
	return (
		<Button width="100%" colorScheme="green" onClick={handleHistory}>
			End Match
		</Button>
	);
}
