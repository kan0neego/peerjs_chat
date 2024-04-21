import { peerSlice } from "../model/peerSlice";

export default function AcceptCall() {
  const answer = peerSlice((state) => state.answer);

  return (
    <button className="button__sm button__sm--green" onClick={() => answer()}>
      <i className="fa fa-phone fa-inverse" aria-hidden="true"></i>
    </button>
  );
}
