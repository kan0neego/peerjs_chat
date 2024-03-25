import Peer, { type MediaConnection } from "peerjs";
import { peerSlice } from "../model/peerSlice";
import screenSharing from "../lib/screenControl";
import videoSharing from "../lib/videoControl";

type Props = {
  peer: Peer;
};

const setCurrentConnection = peerSlice.getState().setCurrentConnection;

export default function ScreenButton({ peer }: Props) {
  const { displayStream, localStream } = peerSlice((state) => state.currentConnection);

  return (
    <button
      className="button__sm button__sm--blue"
      onClick={async () => {
        const connections = peer.connections as {
          [key: string]: MediaConnection[];
        };

        if (displayStream) {
          const videoStream = await videoSharing(connections);
          displayStream.getTracks().forEach((track) => track.stop());
          if (localStream) localStream.getVideoTracks().forEach(track => track.stop())
          setCurrentConnection({ localStream: videoStream, displayStream: null });
        } else {
          const displayStream = await screenSharing(connections);
          if (displayStream) setCurrentConnection({ displayStream });
        }
      }}
    >
      SCR
    </button>
  );
}
