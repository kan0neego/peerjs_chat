import { peerSlice } from "../../../features/VideoChat";
import Display from "./Display";
import CallAction from "./CallAction";
import { DragableCard } from "../../../shared/ui/Card";

export default function VideoChat() {
  const connection = peerSlice((state) => state.connection);

  return connection ? (
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
            padding: "15px",
          }}
        >
          <Display />
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
          <CallAction connection={connection} />
        </div>
      </div>
    </DragableCard>
  ) : null;
}
