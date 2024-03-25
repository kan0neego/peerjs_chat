import { useRef } from "react";
import { switchVoice } from "../lib/voiceControl";

type Props = {
  disabled?: boolean;
  stream: MediaStream | null;
};

const voiceOffIcon = '<i class="fa fa-microphone fa-inverse"></i>';
const voiceOnIcon = '<i class="fa fa-microphone-slash fa-inverse"></i>';

export default function VoiceButton({ stream, disabled }: Props) {
  const buttonRef = useRef<HTMLSpanElement | null>(null);

  const handleClick = () => {
    if (!stream) return;
    const turnOn = switchVoice(stream);
    if (buttonRef.current) {
      if (turnOn) {
        buttonRef.current.innerHTML = voiceOffIcon;
      } else {
        buttonRef.current.innerHTML = voiceOnIcon;
      }
    }
  };

  return (
    <button
      className="button__sm button__sm--blue"
      disabled={disabled}
      onClick={handleClick}
    >
      <span ref={buttonRef}>
        <i className="fa fa-microphone fa-inverse"></i>
      </span>
    </button>
  );
}