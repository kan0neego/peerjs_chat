import { useEffect, useState } from "react";
import { CallButton, peerSlice } from "../../features/VideoChat";
import { VideoChat } from "../../widgets/VideoChat";
import "./styles/App.css";

const setCurrentConnection = peerSlice.getState().setCurrentConnection;

function App() {
  const [id, setId] = useState<string | null>(null);
  const peer = peerSlice((state) => state.peer);
  const connection = peerSlice((state) => state.connection);
  const connect = peerSlice((state) => state.connect);

  useEffect(() => {
    // Сюда передаем ID пользователя
    connect(null, (err, peer) => {
      if (err) {
        console.error(err.message, err.type);
      } else if (peer) {
      }
    });
  }, [connect]);

  useEffect(() => {
    if (peer && connection && id) {
      const dataConnection = peer.connect(id);
      dataConnection.on("open", () => {
        setCurrentConnection({ dataConnection });
      });
    }
  }, [connection, peer, id]);

  return (
    <div className="App">
      <span>My peerID: {peer?.id || "Loading..."}</span>
      <input onChange={(ev) => setId(ev.target.value)} />
      <CallButton id={id} peer={peer} />
      {id && peer && <VideoChat />}
    </div>
  );
}

export default App;
