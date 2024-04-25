import { useRef } from "react";
import { switchVideo } from "../lib/videoControl";

type Props = {
  disabled?: boolean;
  stream: MediaStream;
};

const voiceOffIcon = '<i class="fa fa-video fa-inverse"></i>';
const voiceOnIcon = '<i class="fa fa-video-slash fa-inverse"></i>';

export default function VideoButton({ stream, disabled }: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    const turnOn = switchVideo(stream);
    if (buttonRef.current) {
      if (turnOn) buttonRef.current.innerHTML = voiceOffIcon;
      else buttonRef.current.innerHTML = voiceOnIcon;
    }
  };

  return (
    <button
      ref={buttonRef}
      className="button__sm button__sm--blue"
      disabled={disabled}
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <i className="fa fa-video fa-inverse"></i>
    </button>
  );
}
