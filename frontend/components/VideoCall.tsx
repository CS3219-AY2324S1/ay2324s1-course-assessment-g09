"use client";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { Box, Text, Button, Input, HStack } from "@chakra-ui/react";
import socketManager from "./Sockets/CommunicationSocketManager";
import VideoComponent from "./VideoComponent";
import { set } from "zod";
import { useRouter } from "next/router";
import { get } from "http";

export default function VideoCall({ videoOn, setVideoOn }) {
  const self = socketManager.getSocketId();
  const idToCall = socketManager.getMatchedSocketId();
  const [callerStream, setcallerStream] = useState<MediaStream>();
  const [receiverStream, setReceiverStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const connectionRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    socketManager.subscribeToEvent("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
    socketManager.subscribeToEvent("callEnded", () => {
      if (connectionRef.current) {
        connectionRef.current.destroy();
      }
      router.push("/");
    });
  }, []);

  const getVideo = async () => {
    try {
      const callerStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setcallerStream(callerStream);
      socketManager.subscribeToEvent("callEnded", () => {
        console.log("caller ended call");
        if (callerStream.getTracks()) {
          callerStream.getTracks().forEach((track) => track.stop());
        }
      });
      setVideoOn(!videoOn);
    } catch (err) {
      console.log(err);
    }
  };

  const callUser = async () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: callerStream,
    });
    peer.on("signal", (data) => {
      socketManager.emitEvent("callUser", {
        userToCall: idToCall,
        signalData: data,
        from: self,
      });
    });
    peer.on("stream", (stream) => {
      setReceiverStream(stream);
    });
    socketManager.subscribeToEvent("callAccepted", (signal) => {
      console.log("call accepted");
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };


  const toggleCamera = () => {
    callerStream.getVideoTracks()[0].enabled =
      !callerStream.getVideoTracks()[0].enabled;
  };

  const answerCall = async () => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: callerStream,
    });

    peer.on("signal", (data) => {
      console.log(data);
      socketManager.emitEvent("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      setReceiverStream(stream);
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };


  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };


  return (
    <Box>
      {!callerStream && <Button onClick={getVideo} colorScheme="blue">
        Get Video
      </Button>}

      {!callAccepted && <Button onClick={callUser} colorScheme="purple" mr={2}>
        Call
      </Button>}

      {!callerStream ? null : (
        <HStack>
          <VideoComponent stream={callerStream} isLocal={true} />
          <VideoComponent stream={receiverStream} isLocal={false} />
        </HStack>
      )}
      {callerStream && <Button onClick={toggleCamera} colorScheme="blue">
        Toggle Camera
      </Button>}


      {receivingCall ? (
        <Button onClick={answerCall} colorScheme="green">
          Answer
        </Button>
      ) : null}
      {/* {callAccepted && !callEnded ? (
        <Button onClick={leaveCall} colorScheme="red">
          End Call
        </Button>
      ) : null} */}
    </Box>
  );
}
