import type { DataConnection, MediaConnection, Peer, PeerError } from "peerjs";

interface CurrentConnection {
  connection: MediaConnection | null;
  dataConnection: DataConnection | null;
  remoteStream: MediaStream | null;
  localStream: MediaStream | null;
  displayStream: MediaStream | null;
}

type PeerSliceStore = {
  peer: Peer | null;
  currentConnection: CurrentConnection;
};

type PeerSliceAction = {
  call: (id: string, cb?: (remoteStream: MediaStream) => void) => void;
  close: (localStream: MediaStream, displayStream?: MediaStream | null) => void;
  answer: (cb?:(remoteStream: MediaStream) => void) => void;
  reject: () => void;
  connect: (id: string | null, cb?: (error: ErrorPeerConnection | null, data: Peer | null) => void) => void;

  setCurrentConnection: (currentConnection: Partial<CurrentConnection>) => void;
};

type ErrorPeerConnection = PeerError<
  | "peer-unavailable"
  | "disconnected"
  | "browser-incompatible"
  | "invalid-id"
  | "invalid-key"
  | "network"
  | "ssl-unavailable"
  | "server-error"
  | "socket-error"
  | "socket-closed"
  | "unavailable-id"
  | "webrtc"
>;

export type {
  CurrentConnection,
  ErrorPeerConnection,
  PeerSliceStore,
  PeerSliceAction,
};
