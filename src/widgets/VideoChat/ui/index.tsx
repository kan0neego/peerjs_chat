import Peer from "peerjs";
import { useEffect } from "react";
import { peerSlice } from "../../../features/VideoChat";
import CallAction from "./CallAction";

type Props = {
  id: string;
  peer: Peer;
};

const setCurrentConnection = peerSlice.getState().setCurrentConnection;

export default function VideoChat({ id, peer }: Props) {
  useEffect(() => {
    const dataConnection = peer.connect(id);
    dataConnection.on("open", () => {
      setCurrentConnection({ dataConnection });
    });
  }, [id, peer]);

  return <CallAction peer={peer} />;
}
