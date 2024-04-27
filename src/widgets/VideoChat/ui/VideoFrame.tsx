import { motion } from "framer-motion";
import { Preview, Video } from "../../../entities/Video";
import { forwardRef } from "react";
import { peerSlice } from "../../../features/VideoChat";

type Props = {
  id: string;
  isMain: boolean;
  enabled: boolean;
  onClick: () => void;
  mediaStream: MediaStream | null;
};

export default forwardRef<HTMLDivElement, Props>(function VideoFrame(
  { id, isMain, onClick, mediaStream, enabled }: Props,
  ref
) {
  const isCalling = peerSlice((state) => state.isCalling);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "absolute",
      }}
      variants={{
        initial: {
          width: "100%",
          height: "100%",
          zIndex: 100,
        },
        animate: {
          right: 20,
          bottom: 5,
          width: 240,
          height: 135,
          zIndex: 110,
        },
      }}
      initial="initial"
      animate={isMain ? "initial" : "animate"}
      onClick={onClick}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        {isCalling || !enabled ? (
          <Preview name="TimRoman" srcAvatar="" />
        ) : (
          <Video id={id} mediaStream={mediaStream} />
        )}
      </div>
    </motion.div>
  );
});
