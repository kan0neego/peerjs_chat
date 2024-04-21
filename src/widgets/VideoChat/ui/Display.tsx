import { useEffect, useState } from "react";
import LocalVideoFrame from "./LocalVideoFrame";

export default function Display({ localStream, remoteStream }: Props) {
  const [main, setMain] = useState<SetMain>("local-video");

  useEffect(() => {
    if (remoteStream) setMain("remote-video");
  }, [remoteStream]);

  return (
    <>
      <LocalVideoFrame
        id="local-video"
        isMain={main}
        setMain={setMain}
        mediaStream={localStream}
      />
      {remoteStream && (
        <LocalVideoFrame
          id="remote-video"
          isMain={main}
          setMain={setMain}
          mediaStream={remoteStream}
        />
      )}
    </>
  );
}

type Props = {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
};
type SetMain = "local-video" | "remote-video" | string;
