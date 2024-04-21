import { motion } from "framer-motion";
import Video from "./Video";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  isMain: string;
  setMain: Dispatch<SetStateAction<string>>;
  mediaStream: MediaStream | null;
};

export default function LocalVideoFrame({
  id,
  isMain,
  setMain,
  mediaStream,
}: Props) {
  // const videoWrapper = useRef<HTMLDivElement | null>(null);
  // const resize = useCallback(
  //   ({ width, height }: { width: number; height: number }) => {
  //     const container = videoWrapper.current!;
  //     if (!remoteStream) {
  //       const wDiff = 720 - width;
  //       const hDiff = 480 - height;
  //       container.style.width = `${720 - wDiff - 20}px`;
  //       container.style.height = `${480 - hDiff - 20 - 70}px`;
  //     } else if (width < 220) {
  //       const diff = 220 - width;
  //       container.style.width = `${180 - diff}px`;
  //       container.style.height = `${135 - diff}px`;
  //     }
  //   }, [videoWrapper, remoteStream]
  // );

  // useEffect(() => {
  //   eventEmitter.addListener("update", resize);
  //   return () => {
  //     eventEmitter.removeListener("update", resize);
  //   };
  // }, [resize]);
  const main = id === isMain;

  return (
    <motion.div
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
      animate={main ? "initial" : "animate"}
      onClick={() => setMain(id)}
    >
      <Video id={id} mediaStream={mediaStream} />
    </motion.div>
  );
}
