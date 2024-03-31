import Peer, { MediaConnection } from "peerjs";
import { DragableCard } from "../../../shared";
import AcceptCall from "../../../features/VideoChat/ui/AcceptCall";
import RejectCall from "../../../features/VideoChat/ui/RejectCall";
import {
  ScreenButton,
  VideoButton,
  VoiceButton,
} from "../../../features/VideoChat";
import type { MutableRefObject } from "react";

type Props = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  peer: Peer;
  connection: MediaConnection;
  localStream: MediaStream;
  remoteStream: MediaStream | null;
};

export default function VideoFrame({
  videoRef,
  peer,
  connection,
  localStream,
}: Props) {
  return (
    <DragableCard minWidth={480} minHeight={320}>
      <div style={{ backgroundColor: "rgb(32,33,36)" }}>
        <div>
          <video
            ref={videoRef}
            autoPlay
            // onClick={() => {
            //   if (videoRef.current && localStream && remoteStream) {
            //     const streamObject = videoRef.current.srcObject as MediaStream;
            //     if (streamObject.id === localStream.id) {
            //       videoRef.current!.srcObject = remoteStream;
            //     } else {
            //       videoRef.current!.srcObject = localStream;
            //     }
            //   }
            // }}
            style={{
              width: "100%",
              aspectRatio: "2/1",
              backgroundColor: "black",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.5rem 0",
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
      </div>
    </DragableCard>
  );
}
