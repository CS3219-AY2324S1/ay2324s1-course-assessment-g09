import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function MatchButton({ sendMatchedSocket }) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:6927");
    setSocket(socket);
    socket.on("matched", (event) => {
      console.log(event);
      sendMatchedSocket(event);
    });
  }, []);
  const handleMatch = () => {
    socket?.emit("match", "easy");
  };
  return <Button onClick={handleMatch}> Match</Button>;
}
