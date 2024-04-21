import { motion, useAnimationControls, useDragControls } from "framer-motion";
import DragPointBottomLeft from "./DragPointBottomLeft";
import DragPointBottomRight from "./DragPointBottomRight";
import DragPointTopLeft from "./DragPointTopLeft";
import DragPointTopRight from "./DragPointTopRight";
import { createPortal } from "react-dom";

type Props = {
  minWidth: number;
  minHeight: number;
  children: React.ReactNode;
};

export default function DragableCard({ children, minHeight, minWidth }: Props) {
  const control = useDragControls();
  const animationControl = useAnimationControls();

  return createPortal(
    <motion.div
      id="motion-dragger"
      drag
      draggable={true}
      animate={animationControl}
      dragControls={control}
      dragPropagation={true}
      dragMomentum={false}
      style={{
        width: "fit-content",
        height: "fit-content",
        position: "absolute",
        inset: "0",
      }}
    >
      <div
        id="dragger"
        style={{
          position: "relative",
          width: `${minWidth}px`,
          height: `${minHeight}px`,
        }}
      >
        {children}
        <DragPointBottomRight />
        <DragPointBottomLeft animationControl={animationControl} />
        <DragPointTopLeft animationControl={animationControl} />
        <DragPointTopRight animationControl={animationControl} />
      </div>
    </motion.div>,
    document.body
  );
}
