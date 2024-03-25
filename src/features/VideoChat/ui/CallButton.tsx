import Peer from "peerjs";
import { peerSlice } from "../model/peerSlice";
import type { MutableRefObject } from "react";

type Props = {
  id?: string;
  peer: Peer | null;
  videoRef: MutableRefObject<HTMLVideoElement | null>;
};

export default function CallButton({ id, peer, videoRef }: Props) {
  const isAlloweCall = id && peer && peer.id !== id;
  const call = peerSlice((state) => state.call);

  return (
    <button
      className="button__sm button__sm--green"
      disabled={!isAlloweCall}
      onClick={() => {
        if (isAlloweCall) {
          call(id, (remoteStream: MediaStream) => {
            videoRef.current!.srcObject = remoteStream;
          });
        }
      }}
    >
      <i className="fa fa-phone" aria-hidden="true"></i>
    </button>
  );
}
