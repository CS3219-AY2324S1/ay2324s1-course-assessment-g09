"use client";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { Box, Text, Button, Input } from "@chakra-ui/react";
import socketManager from "./Sockets/SocketManager";

export default function VideoCall() {
  const [self, setSelf] = useState(null);
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(stream);
        myVideo.current.srcObject = stream;
      } catch (err) {
        console.log(err);
      }
    };
    setSelf(socketManager.getSocketId());
    getVideo();
    socketManager.subscribeToEvent("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = async () => {
    const peerCaller = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peerCaller.on("signal", (data) => {
      socketManager.emitEvent("callUser", {
        userToCall: idToCall,
        signalData: data,
        from: self,
        name: name,
      });
    });
    peerCaller.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socketManager.subscribeToEvent("callAccepted", (signal) => {
      console.log("call accepted");
      setCallAccepted(true);
      peerCaller.signal(signal);
    });
    connectionRef.current = peerCaller;
  };

  const answerCall = async () => {
    setCallAccepted(true);
    const peerReceiver = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peerReceiver.on("signal", (data) => {
      console.log(data);
      socketManager.emitEvent("answerCall", { signal: data, to: caller });
    });
    peerReceiver.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });
    peerReceiver.signal(callerSignal);
    connectionRef.current = peerReceiver;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <Box>
      <Input onChange={(e) => setIdToCall(e.target.value)}></Input>
      <Button onClick={callUser}>Call User</Button>
      <video
        playsInline
        muted
        ref={myVideo}
        autoPlay
        style={{ width: "300px" }}
      />
      <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} />
      {receivingCall && !callAccepted ? (
        <Box>
          <Text>{name} is calling...</Text>
          <Button onClick={answerCall}>Answer</Button>
        </Box>
      ) : null}
    </Box>
  );
}
