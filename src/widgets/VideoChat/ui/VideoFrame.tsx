import Video from "./Video";

type Props = {
  id: string;
  mediaStream: MediaStream | null;
};

export default function VideoFrame({ id, mediaStream }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Video id={id} mediaStream={mediaStream} />
    </div>
  );
}
