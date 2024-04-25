import type { DataConnection, MediaConnection, Peer, PeerError } from "peerjs";

interface CurrentConnection {}

type PeerSliceStore = {
  peer: Peer | null;
  connection: MediaConnection | null;
  dataConnection: DataConnection | null;
  remoteStream: MediaStream | null;
  localStream: MediaStream | null;
  isCalling: boolean;
};

type PeerSliceAction = {
  connect: (
    id: string | null,
    cb?: (error: ErrorPeerConnection | null, data: Peer | null) => void
  ) => void;
  call: (id: string, cb?: (remoteStream: MediaStream) => void) => void;
  close: () => boolean;
  answer: (cb?: (remoteStream: MediaStream) => void) => void;
  reject: () => boolean;
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
