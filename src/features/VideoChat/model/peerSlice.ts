import Peer, { MediaConnection } from "peerjs";
import { create } from "zustand";
import type { PeerSliceAction, PeerSliceStore } from "../types";

export const peerSlice = create<PeerSliceStore & PeerSliceAction>(
  (set, get) => ({
    peer: null,
    currentConnection: {
      connection: null,
      localStream: null,
      remoteStream: null,
      displayStream: null,
      dataConnection: null,
    },

    connect: (id, cb) => {
      let peer: Peer;
      const { close } = get();

      if (id) {
        peer = new Peer(id);
      } else {
        peer = new Peer();
      }

      peer.on("open", (connection) => {
        console.log("connection to", connection);
        /**
         * const dataConnection = peer.connect("another-user-id")
         * peer.on("open", () => {
         *  set(dataConnection)
         * })
         */
        if (typeof cb === "function") cb(null, peer);
        set(() => ({ peer }));
      });

      peer.on("connection", (connection) => {
        connection.on("data", (data) => {
          if (typeof data === "string") {
            const { close, currentConnection } = get();
            const { displayStream, localStream, connection } = currentConnection;
            const serializedData = JSON.parse(data);
            switch (serializedData.action) {
              case "close": {
                if (connection) connection.close();
                if (localStream) close(localStream, displayStream);
                break;
              }
            }
          }
        });
      });

      peer.on("call", (connection) => {
        set((state) => ({
          currentConnection: { ...state.currentConnection, connection },
        }));

        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((localStream) => {
            connection.on("close", () => {
              const { currentConnection } = get();
              const { displayStream } = currentConnection;
              close(localStream, displayStream);
            });
            connection.on("stream", (remoteStream) => {
              set((state) => ({
                currentConnection: {
                  ...state.currentConnection,
                  remoteStream,
                },
              }));
            });
            set((state) => ({
              currentConnection: {
                ...state.currentConnection,
                localStream,
              },
            }));
          });
      });

      peer.on("error", (error) => {
        if (typeof cb === "function") cb(error, null);

        switch (error.type) {
          case "peer-unavailable":
          case "browser-incompatible":
          case "unavailable-id": {
            break;
          }
          case "disconnected": {
            peer.reconnect();
            break;
          }
        }
      });
    },

    call: (id, cb) => {
      const { peer } = get();
      if (!peer) return;

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((localStream) => {
          const { close } = get();
          const connection = peer.call(id, localStream);

          connection.on("stream", (remoteStream) => {
            cb(remoteStream);
            set((state) => ({
              currentConnection: {
                ...state.currentConnection,
                remoteStream,
              },
            }));
          });

          connection.on("close", () => close(localStream));

          set((state) => ({
            currentConnection: {
              ...state.currentConnection,
              connection,
              localStream,
            },
          }));
        })
        .catch((rej) => {
          console.error(rej);
        });
    },

    close: (localStream, displayStream) => {
      localStream.getTracks().forEach((str) => str.stop());
      if (displayStream) displayStream.getTracks().forEach((str) => str.stop());

      set((state) => ({
        currentConnection: {
          ...state.currentConnection,
          connection: null,
          localStream: null,
          remoteStream: null,
        },
      }));
    },

    answer: (cb) => {
      const { currentConnection } = get();
      const { connection, localStream } = currentConnection;
      if (connection && localStream) {
        connection.answer(localStream);
        connection.on("stream", (remoteStream: MediaStream) => {
          if (typeof cb === "function") cb(remoteStream);
          set((state) => ({
            currentConnection: {
              ...state.currentConnection,
              connection,
              remoteStream,
            },
          }));
        });
      }
    },

    reject: () => {
      const { currentConnection, close } = get();
      const { connection, dataConnection, localStream } = currentConnection;

      if (dataConnection) {
        dataConnection.send(JSON.stringify({ action: "close", data: null }));
      } else {
        throw new Error("Соединение к удаленному пользователю не установлено.");
      }

      if (connection) connection.close();
      if (localStream) close(localStream);
    },

    setCurrentConnection: (data) => {
      set((state) => ({
        currentConnection: { ...state.currentConnection, ...data },
      }));
    },
  })
);
