import Peer, { MediaConnection } from "peerjs";
import { DragableCard } from "../../../shared";
import AcceptCall from "../../../features/VideoChat/ui/AcceptCall";
import RejectCall from "../../../features/VideoChat/ui/RejectCall";
import { ScreenButton, VideoButton, VoiceButton } from "../../../features/VideoChat";
import type { MutableRefObject } from "react";

type Props = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  peer: Peer;
  connection: MediaConnection;
  localStream: MediaStream;
};

export default function VideoFrame({ videoRef, peer, connection, localStream }: Props) {
  return (
    <DragableCard minWidth={480} minHeight={320}>
        <video
          ref={videoRef}
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            objectFit: "cover"
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            position: "absolute",
            top: "90%",
            left: "50%",
            transform: "translate(-50%, -90%)",
          }}
        >
          {connection.open ? (
            <>
              <ScreenButton peer={peer} />
              <VideoButton stream={localStream} />
              <VoiceButton stream={localStream} />
              <RejectCall />
            </>
          ) : (
            <>
              {!connection.dataChannel && <AcceptCall videoRef={videoRef} />}
              <VideoButton stream={localStream} />
              <VoiceButton stream={localStream} />
              <RejectCall />
            </>
          )}
        </div>
    </DragableCard>
  );
}
