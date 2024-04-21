import Peer from "peerjs";
import {
  RejectCall,
  ScreenButton,
  VideoButton,
  VoiceButton,
  peerSlice,
} from "../../../features/VideoChat";
import VideoFrame from "./VideoFrame";
import AcceptCall from "../../../features/VideoChat/ui/AcceptCall";
import { DragableCard } from "../../../shared/ui/Card";
import LocalVideoFrame from "./LocalVideoFrame";
import Display from "./Display";

type Props = {
  peer: Peer;
};

export default function CallAction({ peer }: Props) {
  const currentConnection = peerSlice((state) => state.currentConnection);
  const { connection, localStream, remoteStream } = currentConnection;

  return (
    <>
      {connection && (
        <DragableCard minWidth={740} minHeight={500}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgb(32,33,36)",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "1 1 100%",
                position: "relative",
                padding: "15px",
              }}
            >
              <Display localStream={localStream} remoteStream={remoteStream} />
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
                  {!connection.dataChannel && <AcceptCall />}
                  <VideoButton stream={localStream} />
                  <VoiceButton stream={localStream} />
                  <RejectCall />
                </>
              )}
            </div>
          </div>
        </DragableCard>
      )}
    </>
  );
}
