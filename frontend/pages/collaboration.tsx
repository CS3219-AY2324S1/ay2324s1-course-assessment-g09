"use client";
import { Box, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import CodeEditor from "../components/CodeEditor";
import VideoCall from "../components/VideoCall";
import MatchButton from "../components/MatchButton";

export default function Collaboration() {
	const router = useRouter();
	const { matchedSocket, matchedUser } = router.query;
	const [questions, setQuestions] = useState([]);
	// const [matchedSocket, setMatchedSocket] = useState(null);
	const selectedItem = {
		name: "Two Sum",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rutrum nisl nibh, nec vestibulum odio pretium vel. Proin quis est dignissim elit tristique luctus sed eget tellus. Sed dapibus consequat semper. Nulla fringilla vulputate libero eu convallis. Aenean nec justo nulla. Pellentesque vel porttitor risus. Mauris porta, dui in venenatis auctor, turpis lorem egestas arcu, in maximus sem metus non turpis. Etiam laoreet mauris a diam tincidunt suscipit. Maecenas hendrerit urna vel congue ultrices. Praesent venenatis enim metus, et posuere nisi semper ut. Praesent porttitor placerat tellus nec pharetra. In hac habitasse platea dictumst. Phasellus lorem libero, venenatis in mauris vel, gravida vehicula nibh. Duis vestibulum congue velit, eu pretium orci sollicitudin nec. Curabitur augue elit, dictum vel nisl mattis, suscipit auctor justo. Aenean tempus volutpat lorem, a ultrices ipsum convallis sit amet. Vestibulum rutrum ut est id blandit. Cras ex leo, suscipit eget nulla eu, viverra faucibus neque. Aliquam arcu elit, imperdiet quis blandit vitae, rhoncus nec orci. Fusce sit amet dui sed lorem tempor molestie vitae sed nunc. Vestibulum blandit aliquam euismod. Maecenas sit amet sollicitudin nibh, eu elementum nulla. Pellentesque nisl magna, ultrices eu fringilla quis, ornare et est.",
		createdAt: "2022-10-22 20:19:50.236312+00:00",
		updatedAt: "2022-10-22 20:19:50.236312+00:00",
	};

	return (
		<Box>
			{/* {matchedSocket ? ( */}
			<Box>
				<Grid templateColumns="repeat(2, 1fr)" gap={5} h="80vh">
					<GridItem display="flex" flex="1">
						<Box flexDirection="column">
							{selectedItem && (
								<Box flex={1} alignSelf="top">
									<Text>{selectedItem.content}</Text>
								</Box>
							)}
							{/* <VideoCall /> */}
						</Box>
					</GridItem>
					<GridItem display="flex" flex="1">
						<CodeEditor socketRoom={matchedSocket} />
					</GridItem>
				</Grid>
			</Box>
			{/* ) : (
        <MatchButton sendMatchedSocket={receiveMatchedSocket} />
      )} */}
		</Box>
	);
}
