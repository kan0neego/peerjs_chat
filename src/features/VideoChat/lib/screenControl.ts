import Media from "../../../shared/lib/Media";
import type { MediaConnection } from "peerjs";

export default async function screenSharing(connection: MediaConnection) {
  const media = new Media();

  return await media.getDisplayStream((err: any, localStream: MediaStream) => {
    if (err) return console.error(err);
    const senders = connection.peerConnection.getSenders();
    senders.forEach((sender) => {
      if (sender.track) {
        console.log(sender);
        if (sender.track.kind === "video") {
          sender.replaceTrack(localStream.getVideoTracks()[0]);
        }
      }
    });
  });
}
