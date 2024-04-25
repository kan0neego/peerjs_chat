import Peer from "peerjs";
import { create } from "zustand";
import type { PeerSliceAction, PeerSliceStore } from "../types";
import Media from "../../../shared/lib/Media";

export const peerSlice = create<PeerSliceStore & PeerSliceAction>(
  (set, get) => ({
    peer: null,
    connection: null,
    dataConnection: null,
    localStream: null,
    remoteStream: null,
    isCalling: false,

    connect: (id, cb) => {
      let peer: Peer;
      const { close } = get();

      if (id) {
        peer = new Peer(id);
      } else {
        peer = new Peer();
      }

      peer.on("open", (id) => {
        console.log("connection to", id);
        if (typeof cb === "function") cb(null, peer);
        set(() => ({ peer }));
      });

      peer.on("connection", (connection) => {
        connection.on("data", (data) => {
          if (typeof data === "string") {
            const { close } = get();
            const serializedData = JSON.parse(data);
            switch (serializedData.action) {
              case "close": {
                close();
                break;
              }
            }
          }
        });
      });

      peer.on("call", (connection) => {
        const media = new Media();
        media.getVideoStream((err: any, localStream: MediaStream) => {
          if (err) return null;
          connection.on("stream", (remoteStream) => set(() => ({ remoteStream })));
          connection.on("close", () => close());
          set(() => ({ localStream }));
        });
        set(() => ({ connection, isCalling: true }));
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

    call: (id) => {
      const { peer } = get();
      if (!peer) return;
      const media = new Media();
      media.getVideoStream((err: any, localStream: MediaStream) => {
        const { close } = get();
        const connection = peer.call(id, localStream);
        connection.on("stream", (remoteStream) => set(() => ({ remoteStream })));
        connection.on("close", () => close());
        set(() => ({ connection, localStream }));
      });
    },

    answer: (cb) => {
      const { connection, localStream } = get();
      if (connection && localStream) {
        connection.answer(localStream);
        connection.on("stream", (remoteStream: MediaStream) => {
          if (typeof cb === "function") cb(remoteStream);
          set(() => ({ remoteStream, isCalling: false }));
        });
      }
    },

    close: () => {
      const { connection, dataConnection, localStream } = get();
      if (connection) connection.close();
      if (dataConnection) dataConnection.close();
      if (localStream) localStream.getTracks().forEach((str) => str.stop());
      set(() => ({ connection: null, localStream: null, remoteStream: null, dataConnection: null }));
      return true;
    },

    reject: () => {
      const { dataConnection, close } = get();
      if (dataConnection) dataConnection.send(JSON.stringify({ action: "close", data: null }));
      const closed = close();
      return closed;
    },

    setCurrentConnection: (data) => {
      set(() => ({ ...data }));
    },
  })
);
