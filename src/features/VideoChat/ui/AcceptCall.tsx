import { peerSlice } from "../model/peerSlice";
import type { MutableRefObject } from "react";

type Props = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
};

export default function AcceptCall({ videoRef }: Props) {
  const answer = peerSlice((state) => state.answer);

  return (
    <button
      className="button__sm button__sm--green"
      onClick={() => {
        answer((remoteStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = remoteStream;
          }
        });
      }}
    >
      <i className="fa fa-phone fa-inverse" aria-hidden="true"></i>
    </button>
  );
}
