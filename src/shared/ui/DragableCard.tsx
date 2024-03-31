import { motion, useDragControls } from "framer-motion";
import { useRef } from "react";
import draggerDown from "../lib/dragger-resizeable";

type Props = {
  minWidth: number;
  minHeight: number;
  children: React.ReactNode;
};

export default function DragableCard({ children, minHeight, minWidth }: Props) {
  // const body = document.querySelector("body")!;
  // const bodyRef = useRef<HTMLBodyElement>(body);
  const resizeableRef = useRef<HTMLDivElement | null>(null);
  const control = useDragControls();

  const handleClick = ({ height, width }: { height: any; width: any }) => {
    if (width < minWidth || height < minHeight) return;
    if (resizeableRef.current) {
      resizeableRef.current.style.height = `${height}px`;
      resizeableRef.current.style.width = `${width}px`;
    }
  };

  return (
    <div
      id="dragger"
      ref={resizeableRef}
      style={{
        width: `${minWidth}px`,
        height: `${minHeight}px`,
      }}
    >
      <motion.div
        style={{ position: "relative" }}
        drag
        draggable={true}
        dragControls={control}
        dragPropagation={true}
        dragMomentum={false}
        // dragConstraints={bodyRef}
      >
        {children}
        <i
          className="resizeable"
          onPointerDownCapture={(ev) => ev.stopPropagation()}
          onMouseDown={(ev) => draggerDown(ev, handleClick)}
        ></i>
      </motion.div>
    </div>
  );
}
