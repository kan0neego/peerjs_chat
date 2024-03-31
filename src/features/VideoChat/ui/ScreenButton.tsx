import Peer, { type MediaConnection } from "peerjs";
import { peerSlice } from "../model/peerSlice";
import screenSharing from "../lib/screenControl";
import videoSharing from "../lib/videoControl";
import { useRef } from "react";

type Props = {
  peer: Peer;
};

const setCurrentConnection = peerSlice.getState().setCurrentConnection;
const displayOnIcon = '<i class="fa fa-desktop fa-stack fa-inverse" aria-hidden="true"></i>';
const displayOffIcon = '<i class="fa fa-desktop fa-stack fa-inverse" aria-hidden="true"></i> <i class="fa-solid fa-slash fa-stack-1x fa-inverse" aria-hidden="true"></i>';

export default function ScreenButton({ peer }: Props) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const { displayStream, localStream } = peerSlice(
    (state) => state.currentConnection
  );

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
          if (localStream) localStream.getVideoTracks().forEach((track) => track.stop());
          spanRef.current!.innerHTML = displayOnIcon;
          setCurrentConnection({ localStream: videoStream, displayStream: null });
        } else {
          const displayStream = await screenSharing(connections);
          if (!displayStream) return;
          spanRef.current!.innerHTML = displayOffIcon;
          setCurrentConnection({ displayStream });
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span ref={spanRef} className="fa-stack">
        <i className="fa fa-desktop fa-stack fa-inverse" aria-hidden="true"></i>
      </span>
    </button>
  );
}
