import Media from "../../../shared/lib/Media";
import type { MediaConnection } from "peerjs";

function switchVideo(stream: MediaStream) {
  const turn = !stream.getVideoTracks()[0].enabled;
  stream.getVideoTracks()[0].enabled = turn;
  return turn;
}

export default async function videoSharing(connection: MediaConnection) {
  const media = new Media();
  return await media.getVideoStream((err: any, stream: MediaStream) => {
    if (err) return console.error(err);
    stream.getAudioTracks()[0].stop();
    const senders = connection.peerConnection.getSenders();
    senders.forEach((sender) => {
      if (sender.track) {
        if (sender.track.kind === "video") {
          sender.replaceTrack(stream.getVideoTracks()[0]);
        }
      }
    });
  });
}

export { switchVideo, videoSharing };
