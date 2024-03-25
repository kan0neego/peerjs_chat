import Peer from "peerjs";
import { useEffect } from "react";
import { peerSlice } from "../../../features/VideoChat";
import CallAction from "./CallAction";

type Props = {
  id: string;
  peer: Peer | null;
};

const setCurrentConnection = peerSlice.getState().setCurrentConnection;

export default function VideoChat({ id, peer }: Props) {
  useEffect(() => {
    // Подключение
    if (peer && id) {
      const dataConnection = peer.connect(id);
      dataConnection.on("open", () => {
        setCurrentConnection({ dataConnection });
      });
    }
  }, [id, peer]);

  useEffect(() => {
    return () => {
      if (peer) peer.destroy();
    };
  }, [peer]);

  return <CallAction id={id} peer={peer} />;
}
