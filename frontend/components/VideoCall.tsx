"use client";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import { Box, Text, Button, Input } from "@chakra-ui/react";
import {
  disconnectSocket,
  subscribeToEvent,
  emitEvent,
  getSelf,
} from "../components/Sockets/videoSockets";
import { get } from "http";

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
    // connectSocket();

    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(stream);
        myVideo.current.srcObject = stream;
        console.log(myVideo.current.srcObject);
      } catch (err) {
        console.log(err);
      }
    };
    setSelf(getSelf());
    // getVideo();
    // subscribeToEvent("getSelfId", (socketId) => {
    //   console.log(socketId);
    //   setSelf(socketId);
    // });
    // subscribeToEvent("getSelfId", (socketId) => {
    //   console.log(self);
    //   setSelf(socketId);
    // });

    console.log(self);

    subscribeToEvent("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
    // socket.on("callUser", (data) => {
    //   setReceivingCall(true);
    //   setCaller(data.from);
    //   setName(data.name);
    //   setCallerSignal(data.signal);
    // });
    return () => {
      // socket.disconnect();
      disconnectSocket();
    };
  }, []);

  const callUser = async () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      // socket.emit("callUser", {
      //   userToCall: idToCall,
      //   signalData: data,
      //   from: self,
      //   name: name,
      // });
      emitEvent("callUser", {
        userToCall: idToCall,
        signalData: data,
        from: self,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    // socket.on("callAccepted", (signal) => {
    //   console.log("call accepted");
    //   setCallAccepted(true);
    //   peer.signal(signal);
    // });
    subscribeToEvent("callAccepted", (signal) => {
      console.log("call accepted");
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const answerCall = async () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      console.log(data);
      // socket.emit("answerCall", { signal: data, to: caller });
      emitEvent("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      console.log(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });
    peer.signal(callerSignal);
    connectionRef.current = peer;
    console.log(userVideo.current.srcObject);
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
