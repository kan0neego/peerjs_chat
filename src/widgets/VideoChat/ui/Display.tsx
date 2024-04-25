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
    if (remoteStream) setMain("remote-video");
  }, [remoteStream]);

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

  return (
    <>
      <VideoFrame
        ref={localVideoRef}
        id="local-video"
        isMain={main === "local-video"}
        onClick={() => setMain("local-video")}
        mediaStream={localStream}
      />
      {remoteStream && (
        <VideoFrame
          ref={remoteVideoRef}
          id="remote-video"
          isMain={main === "remote-video"}
          onClick={() => setMain("remote-video")}
          mediaStream={remoteStream}
        />
      )}
    </>
  );
}

type SetMain = "local-video" | "remote-video" | string;
