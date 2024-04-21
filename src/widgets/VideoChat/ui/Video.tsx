import { useEffect, useRef } from "react";

function Video({ id, mediaStream }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [id, mediaStream]);

  return (
    <video
      id={id}
      ref={videoRef}
      autoPlay
      playsInline
      onDoubleClick={(e) => {
        e.currentTarget.requestFullscreen();
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "-1px",
        left: "-1px",
        cursor: "pointer",
      }}
    />
  );
}

type Props = {
  id: string;
  mediaStream: MediaStream | null;
};

export default Video;
