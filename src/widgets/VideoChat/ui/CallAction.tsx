import Peer from "peerjs";
import { useRef } from "react";
import { CallButton, peerSlice } from "../../../features/VideoChat";
import VideoFrame from "./VideoFrame";

type Props = {
  id?: string;
  peer: Peer | null;
};

export default function CallAction({ id, peer }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentConnection = peerSlice((state) => state.currentConnection);
  const { connection, localStream, remoteStream } = currentConnection;

  return (
    <>
      <CallButton id={id} peer={peer} videoRef={videoRef} />
      {peer && connection && localStream && (
        <VideoFrame
          peer={peer}
          videoRef={videoRef}
          connection={connection}
          localStream={localStream}
          remoteStream={remoteStream}
        />
      )}
    </>
  );
}
