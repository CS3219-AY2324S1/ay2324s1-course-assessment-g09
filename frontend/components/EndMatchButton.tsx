import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import matchSocketManager from "./Sockets/MatchSocketManager";
import socketManager from "./Sockets/CommunicationSocketManager";
import collabSocketManager from "./Sockets/CollabSocketManager";

export default function EndMatchButton({
  code,
  language,
  theme,
  handleHistory,
}) {
  const router = useRouter();

  return (
    <Button width="100%" colorScheme="green" onClick={handleHistory}>
      End Match
    </Button>
  );

}
