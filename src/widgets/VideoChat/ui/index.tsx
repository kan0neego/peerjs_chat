import Display from "./Display";
import CallAction from "./CallAction";
import { DragableCard } from "../../../shared/ui/Card";
import Peer, { type MediaConnection } from "peerjs";

export default function VideoChat({ peer, connection }: Props) {
  return (
    <DragableCard minWidth={360} minHeight={260}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(32,33,36)",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "1 1 100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Display peer={peer} connection={connection} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.5rem 0",
          }}
        >
          <CallAction peer={peer} connection={connection} />
        </div>
      </div>
    </DragableCard>
  );
}

type Props = { peer: Peer; connection: MediaConnection };
