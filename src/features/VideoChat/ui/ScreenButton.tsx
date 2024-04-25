import { useRef, useState } from "react";
import { peerSlice } from "../model/peerSlice";
import screenSharing from "../lib/screenControl";
import videoSharing from "../lib/videoControl";
import { type MediaConnection } from "peerjs";
import Media from "../../../shared/lib/Media";

type Props = {
  connection: MediaConnection;
  stream: MediaStream;
};

const setCurrentConnection = peerSlice.getState().setCurrentConnection;

export default function ScreenButton({ stream, connection }: Props) {
  const [shared, toShare] = useState(false);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const videoElement = document.querySelector("#local-video") as HTMLVideoElement;

  const handleClick = async () => {
    const newStream = shared ? await videoSharing(connection) : await screenSharing(connection);
    if (newStream) {
      const media = new Media();
      const videoTracks = newStream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();
      const mixin = media.createMediaStream(videoTracks, audioTracks);
      stream.getVideoTracks().forEach((track) => track.stop());
      videoElement.srcObject = mixin;
      toShare((prevState) => !prevState);
      setCurrentConnection({ localStream: mixin });
    }
  };

  return (
    <button
      className="button__sm button__sm--blue"
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span ref={spanRef} className="fa-stack">
        <i className="fa fa-desktop fa-stack fa-inverse" aria-hidden="true"></i>
        {shared && (
          <i
            className="fa-solid fa-slash fa-stack-1x fa-inverse"
            aria-hidden="true"
          ></i>
        )}
      </span>
    </button>
  );
}
