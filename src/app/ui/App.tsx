import { useEffect, useState } from "react";
import { peerSlice } from "../../features/VideoChat";
import { VideoChat } from "../../widgets/VideoChat";
import "./styles/App.css";

function App() {
  const [id, setId] = useState<string>("");
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
  }, []);


  return (
    <div className="App">
      <span>My peerID: {peer?.id || "Loading..."}</span>
      <input
        onChange={(ev) => {
          const id = ev.target.value;
          setId(id);
        }}
      />
      <VideoChat id={id} peer={peer} />
    </div>
  );
}

export default App;
