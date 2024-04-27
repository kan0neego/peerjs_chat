import { peerSlice } from "../model/peerSlice";

export default function RejectCall() {
  const reject = peerSlice((state) => state.reject);

  return (
    <button
      className="button__sm button__sm--red"
      onClick={() => reject()}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <i className="fa fa-phone fa-inverse" aria-hidden="true"></i>
    </button>
  );
}
