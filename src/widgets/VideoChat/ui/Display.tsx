import { useEffect, useRef, useState } from "react";
import { peerSlice } from "../../../features/VideoChat";
import VideoFrame from "./VideoFrame";
import Peer, { MediaConnection } from "peerjs";

export default function Display({ peer, connection }: Props) {
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const remoteVideoRef = useRef<HTMLDivElement | null>(null);
  const remoteStream = peerSlice((state) => state.remoteStream);
  const localStream = peerSlice((state) => state.localStream);
  const isVideoEnabled = peerSlice((state) => state.isVideoEnabled);
  const isLocalVideoEnabled = peerSlice((state) => state.isLocalVideoEnabled);
  const [main, setMain] = useState<SetMain>(peer.id);

  useEffect(() => {
    if (remoteStream) setMain(connection.peer);
  }, [remoteStream, connection]);

  // useEffect(() => {
  //   const resizeableEl = document.querySelector("#dragger")!;
  //   const ro = new ResizeObserver((entries) => {
  //     const { width, height } = entries[0].contentRect;
  //     const video =
  //       main === peer.id ? remoteVideoRef.current : localVideoRef.current;
  //     if (!video) return;
  //   });
  //   ro.observe(resizeableEl);

  return (
    <>
      <VideoFrame
        id={"local-video"}
        ref={localVideoRef}
        isMain={main === peer.id}
        mediaStream={localStream}
        enabled={isLocalVideoEnabled}
        onClick={() => setMain(peer.id)}
      />
      {remoteStream && (
        <VideoFrame
          id={"remote-video"}
          ref={remoteVideoRef}
          isMain={main === connection.peer}
          mediaStream={remoteStream}
          enabled={
            isVideoEnabled.id === connection.peer
              ? isVideoEnabled.enabled
              : true
          }
          onClick={() => setMain(connection.peer)}
        />
      )}
    </>
  );
}

type Props = { peer: Peer; connection: MediaConnection };
type SetMain = "local-video" | "remote-video" | string;
