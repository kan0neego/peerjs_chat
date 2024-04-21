import { type MouseEvent, useRef } from "react";
import { resizeFromBottomLeft } from "../../../lib/dragable/resize";
import { AnimationControls } from "framer-motion";

type Props = {
  animationControl: AnimationControls;
};

export default function DragPointBottomLeft({ animationControl }: Props) {
  const pointerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const card = document.querySelector("#dragger") as HTMLDivElement;
    const motion = document.querySelector("#motion-dragger") as HTMLDivElement;

    const { left } = motion.getBoundingClientRect();
    const currentX = Math.round(left);
    const currentWidth = parseFloat(card.style.width);
    const currentHeight = parseFloat(card.style.height);
    const currentPageX = event.pageX;
    const currentPageY = event.pageY;

    const moveTo = (e: globalThis.MouseEvent) => {
      const { width, height, left } = resizeFromBottomLeft({
        currentHeight,
        currentPageX,
        currentPageY,
        currentWidth,
        currentX,
      })(e);

      card.style.width = `${width}px`;
      card.style.height = `${height}px`;
      animationControl.set({ x: left });
    };

    window.addEventListener("mousemove", moveTo);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", moveTo);
    });
  };

  return (
    <div
      ref={pointerRef}
      onPointerDownCapture={(ev) => ev.stopPropagation()}
      onMouseDown={handleMouseDown}
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "white",
        border: "3px solid #4286f4",
        position: "absolute",
        bottom: -5,
        left: -5,
        zIndex: -1,
      }}
    ></div>
  );
}
