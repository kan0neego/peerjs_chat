import { useEffect, useRef, useState } from "react";
import { peerSlice } from "../../../features/VideoChat";
import VideoFrame from "./VideoFrame";

export default function Display() {
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const remoteVideoRef = useRef<HTMLDivElement | null>(null);
  const remoteStream = peerSlice((state) => state.remoteStream);
  const localStream = peerSlice((state) => state.localStream);
  const [main, setMain] = useState<SetMain>("local-video");

  useEffect(() => {
    const resizeableEl = document.querySelector("#dragger")!;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const video = main === "local-video" ? remoteVideoRef.current : localVideoRef.current;
      if (!video) return;
    });
    ro.observe(resizeableEl);

    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [main, remoteVideoRef, localVideoRef]);

  useEffect(() => {
    if (remoteStream) setMain("remote-video");
  }, [remoteStream]);

  return (
    <>
      <VideoFrame
        ref={localVideoRef}
        id="local-video"
        mainDisplay={main}
        setMain={setMain}
        mediaStream={localStream}
      />
      {remoteStream && (
        <VideoFrame
          ref={remoteVideoRef}
          id="remote-video"
          mainDisplay={main}
          setMain={setMain}
          mediaStream={remoteStream}
        />
      )}
    </>
  );
}

type SetMain = "local-video" | "remote-video" | string;
