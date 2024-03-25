import { useRef } from "react";
import { switchVideo } from "../lib/videoControl";

type Props = {
  disabled?: boolean;
  stream: MediaStream | null;
};

export default function VideoButton({ stream, disabled }: Props) {
  const buttonRef = useRef<HTMLSpanElement | null>(null);

  return (
    <button
      className="button__sm button__sm--blue"
      disabled={disabled}
      onClick={() => {
        if (!stream) return;
       switchVideo(stream);
      }}
    >
      <span ref={buttonRef} >
        <i className="fa fa-video-camera fa-inverse"></i>
      </span>
    </button>
  );
}
