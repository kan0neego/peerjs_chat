import { useEffect, useState } from "react";
import { CallButton, peerSlice } from "../../features/VideoChat";
import { VideoChat } from "../../widgets/VideoChat";
import "./styles/App.css";

function App() {
  const [id, setId] = useState<string | null>(null);
  const peer = peerSlice((state) => state.peer);
  const connect = peerSlice((state) => state.connect);

  useEffect(() => {
    // Сюда передаем ID пользователя
    connect(null, (err, peer) => {
      if (err) {
        console.error(err.message, err.type);
      } else if (peer) {
        // Здесь устанавливаем соединение с удаленным пользователем
        // console.log(peer)
      }
    });
  }, [connect]);

  return (
    <div className="App">
      <span>My peerID: {peer?.id || "Loading..."}</span>
      <input onChange={(ev) => setId(ev.target.value)} />
      <CallButton id={id} peer={peer} />
      {id && peer && <VideoChat id={id} peer={peer} />}
    </div>
  );
}

export default App;
