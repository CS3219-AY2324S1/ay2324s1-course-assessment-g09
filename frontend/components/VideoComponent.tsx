import { useRef, useEffect } from "react";

export default function VideoComponent({ stream, isLocal }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		console.log("caller?", isLocal, stream);
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return <video ref={videoRef} autoPlay playsInline muted={isLocal} />;
}
