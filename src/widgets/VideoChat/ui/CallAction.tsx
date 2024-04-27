import {
  RejectCall,
  ScreenButton,
  VideoButton,
  VoiceButton,
  peerSlice,
} from "../../../features/VideoChat";
import AcceptCall from "../../../features/VideoChat/ui/AcceptCall";
import { Fragment } from "react/jsx-runtime";
import Peer, { type MediaConnection } from "peerjs";

type Props = {
  peer: Peer;
  connection: MediaConnection;
};

export default function CallAction({ peer, connection }: Props) {
  const isCalling = peerSlice((state) => state.isCalling);
  const localStream = peerSlice((state) => state.localStream);

  return (
    <Fragment>
      {localStream && (
        <>
          {isCalling ? (
            <AcceptCall />
          ) : (
            <ScreenButton
              peerId={peer.id}
              stream={localStream}
              connection={connection}
            />
          )}
          <VideoButton peerId={peer.id} stream={localStream} />
          <VoiceButton stream={localStream} />
          <RejectCall />
        </>
      )}
    </Fragment>
  );
}
