import { useRef } from "react";
import { switchVoice } from "../lib/voiceControl";

type Props = {
  disabled?: boolean;
  stream: MediaStream;
};

const voiceOffIcon = '<i class="fa fa-microphone fa-inverse"></i>';
const voiceOnIcon = '<i class="fa fa-microphone-slash fa-inverse"></i>';

export default function VoiceButton({ stream, disabled }: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    const turnOn = switchVoice(stream);
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
        flexShrink: 0,
      }}
    >
      <i className="fa fa-microphone fa-inverse"></i>
    </button>
  );
}
