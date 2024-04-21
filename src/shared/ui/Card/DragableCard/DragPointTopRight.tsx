import { type MouseEvent, useRef } from "react";
import { resizeFromTopRight } from "../../../lib/dragable/resize";
import { type AnimationControls } from "framer-motion";

type Props = {
  animationControl: AnimationControls;
};

export default function DragPointTopRight({ animationControl }: Props) {
  const pointerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const card = document.querySelector("#dragger") as HTMLDivElement;
    const motion = document.querySelector("#motion-dragger") as HTMLDivElement;

    const { top } = motion.getBoundingClientRect();
    const currentY = Math.round(top);
    const currentWidth = parseFloat(card.style.width);
    const currentHeight = parseFloat(card.style.height);
    const currentPageX = event.pageX;
    const currentPageY = event.pageY;
    const moveTo = (e: globalThis.MouseEvent) => {
      const { width, height, top } = resizeFromTopRight({
        currentY,
        currentHeight,
        currentPageX,
        currentPageY,
        currentWidth,
      })(e);

      card.style.width = `${width}px`;
      card.style.height = `${height}px`;
      animationControl.set({ y: top });
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
        top: -5,
        right: -5,
        zIndex: -1,
      }}
    ></div>
  );
}
