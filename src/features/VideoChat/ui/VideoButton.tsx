import { useRef } from "react";
import { switchVideo } from "../lib/videoControl";
import { peerSlice } from "../model/peerSlice";

type Props = {
  peerId: string;
  disabled?: boolean;
  stream: MediaStream;
};

const voiceOffIcon = '<i class="fa fa-video fa-inverse"></i>';
const voiceOnIcon = '<i class="fa fa-video-slash fa-inverse"></i>';

const setPeerProp = peerSlice.getState().setCurrentConnection;

export default function VideoButton({ peerId, stream, disabled }: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dataConnection = peerSlice((state) => state.dataConnection);

  const handleClick = () => {
    const button = buttonRef.current!;
    const turn = switchVideo(stream);
    const data = { id: peerId, enabled: turn };
    if (dataConnection) {
      const payload = JSON.stringify({ action: "video-mute", data });
      dataConnection.send(payload);
    }
    if (turn) button.innerHTML = voiceOffIcon;
    else button.innerHTML = voiceOnIcon;
    setPeerProp({ isLocalVideoEnabled: turn });
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
      <i className="fa fa-video fa-inverse"></i>
    </button>
  );
}
