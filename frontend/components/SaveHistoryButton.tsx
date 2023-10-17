import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";

export default function SaveHistoryButton({
	code,
	language,
	difficulty,
	theme,
	matchedUser,
}) {
	const router = useRouter();
	const handleHistory = async () => {
		const user1 = JSON.parse(sessionStorage.getItem("login")).email;
		const user2 = matchedUser;
		const questionName = "Test Question";
		const question = "Test Question";
		const data = {
			user1,
			user2,
			difficulty,
			questionName,
			question,
			language,
			theme,
			code,
		};
		const res = await axios
			.post("http://localhost:6969/history/create", data)
			.then((res) => console.log(res.data))
			.then(() => router.push("/"))
			.catch((err) => console.log(err));
	};
	return (
		<Button width="100%" colorScheme="green" onClick={handleHistory}>
			End Match
		</Button>
	);
}
