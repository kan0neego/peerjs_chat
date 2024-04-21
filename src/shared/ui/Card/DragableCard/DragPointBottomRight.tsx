import { resizeFromBottomRight } from "../../../lib/dragable/resize";
import { type MouseEvent, useRef } from "react";

export default function DragPointBottomRight() {
  const pointerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const card = document.querySelector("#dragger") as HTMLDivElement;

    const currentWidth = parseFloat(card.style.width);
    const currentHeight = parseFloat(card.style.height);
    const currentPageX = event.pageX;
    const currentPageY = event.pageY;

    const moveTo = (e: globalThis.MouseEvent) => {
      const { width, height } = resizeFromBottomRight({
        currentHeight,
        currentPageX,
        currentPageY,
        currentWidth,
      })(e);
      card.style.width = `${width}px`;
      card.style.height = `${height}px`;
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
        right: -5,
        zIndex: -1,
      }}
    ></div>
  );
}
