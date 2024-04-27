import Peer from "peerjs";
import { peerSlice } from "../model/peerSlice";

type Props = {
  id: string | null;
  peer: Peer | null;
};

export default function CallButton({ id, peer }: Props) {
  const isCallable = id && peer && peer.id !== id;
  const call = peerSlice((state) => state.call);

  return (
    <button
      className="button__sm button__sm--green"
      disabled={!isCallable}
      onClick={() => {
        if (isCallable) call(id);
      }}
      style={{
        flexShrink: 0,
      }}
    >
      <i className="fa fa-phone" aria-hidden="true"></i>
    </button>
  );
}
