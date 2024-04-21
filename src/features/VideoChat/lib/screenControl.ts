import type { MediaConnection } from "peerjs";

export default async function screenSharing(_connections: {
  [key: string]: MediaConnection[];
}) {
  const localStream = await navigator.mediaDevices
    .getDisplayMedia()
    .then((localStream) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (let [_, connections] of Object.entries(_connections)) {
        const mediaConnections = connections.filter(
          (connection) => connection.type === "media"
        );
        mediaConnections.forEach((connection) => {
          connection.peerConnection
            .getSenders()[1]
            .replaceTrack(localStream.getTracks()[0]);
        });
      }

      return localStream;
    })
    .catch((err) => {
      return null;
    });

  return localStream;
}
