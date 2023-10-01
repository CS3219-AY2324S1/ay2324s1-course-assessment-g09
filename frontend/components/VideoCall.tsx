"use client";
import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
// import Peer from "peerjs";

function VideoCall() {
  const webcamRef = useRef(null);

  useEffect(() => {
    // Access the user's camera and microphone
    import("peerjs").then(({ default: Peer }) => {
      // normal synchronous code
      const peer = new Peer();
      peer.on("open", (id) => {
        console.log(id);
      });
    });
  }, []);

  return (
    <div>
      <h1>Video call temp</h1>
      <Webcam ref={webcamRef} />
    </div>
  );
}

export default VideoCall;
