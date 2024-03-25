import type { MediaConnection } from "peerjs";

function switchVideo(stream: MediaStream) {
  const turnOn = stream.getVideoTracks()[0].enabled;
  stream.getVideoTracks()[0].enabled = !turnOn;

  return !turnOn;
}

export default async function videoSharing(_connections: {
  [key: string]: MediaConnection[];
}) {
  const localStream = await navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((localStream) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (let [_, connections] of Object.entries(_connections)) {
        const mediaConnections = connections.filter(
          (connection) => connection.type === "media"
        );
        mediaConnections.forEach((connection) => {
          connection.peerConnection
            .getSenders()[1]
            .replaceTrack(localStream.getVideoTracks()[0]);
        });
      }

      return localStream;
    });

  return localStream;
}

export { switchVideo, videoSharing };
