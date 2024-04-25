import {
  RejectCall,
  ScreenButton,
  VideoButton,
  VoiceButton,
  peerSlice,
} from "../../../features/VideoChat";
import AcceptCall from "../../../features/VideoChat/ui/AcceptCall";
import { Fragment } from "react/jsx-runtime";
import { type MediaConnection } from "peerjs";

type Props = {
  connection: MediaConnection;
};

export default function CallAction({ connection }: Props) {
  const isCalling = peerSlice((state) => state.isCalling);
  const localStream = peerSlice((state) => state.localStream);

  return (
    <Fragment>
      {localStream && (
        <>
          {isCalling && <AcceptCall />}
          <ScreenButton stream={localStream} connection={connection} />
          <VideoButton stream={localStream} />
          <VoiceButton stream={localStream} />
          <RejectCall />
        </>
      )}
    </Fragment>
  );
}
