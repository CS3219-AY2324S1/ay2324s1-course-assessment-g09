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
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => {
    //     // Display the user's video stream in the webcam element
    //     webcamRef.current.srcObject = stream;

    //     // Create a PeerJS connection
    //     const myPeer = new Peer();

    //     // Handle incoming calls
    //     myPeer.on("call", (call) => {
    //       call.answer(stream); // Answer the call with the user's stream
    //       call.on("stream", (remoteStream) => {
    //         // Display the remote user's video stream
    //         // You can create a video element for this
    //       });
    //     });
    //     myPeer.on("stream", (remoteStream) => {
    //       // Assuming you have an Audio element in your component
    //     });
    //     // Get your PeerJS ID and log it
    //     myPeer.on("open", (id) => {
    //       console.log("My peer ID is: " + id);
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error accessing camera and microphone:", error);
    //   });
  }, []);

  return (
    <div>
      <h1>Video call temp</h1>
      <Webcam ref={webcamRef} />
    </div>
  );
}

export default VideoCall;
