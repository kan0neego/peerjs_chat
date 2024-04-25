import { motion } from "framer-motion";
import { Video } from "../../../entities/Video";
import { forwardRef } from "react";

type Props = {
  id: string;
  isMain: boolean;
  onClick: () => void;
  mediaStream: MediaStream | null;
};

export default forwardRef<HTMLDivElement, Props>(function VideoFrame({
  id,
  isMain,
  onClick,
  mediaStream,
}: Props, ref) {
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
          backgroundColor: "yellow",
          borderRadius: "15px",
        }}
      >
        <Video id={id} mediaStream={mediaStream} />
      </div>
    </motion.div>
  );
});
