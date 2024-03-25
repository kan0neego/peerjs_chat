import React from "react";

function calculateNewSize(size: {
  currHeight: any;
  currWidth: any;
  newHeight?: any;
  newWidth?: any;
  offsetX: any;
  offsetY: any;
}) {
  var newWidth;
  var newHeight;

  if (Math.abs(size.offsetX) > Math.abs(size.offsetY)) {
    newWidth = size.currWidth + size.offsetX;
    newHeight = newWidth * (size.currHeight / size.currWidth);
  } else {
    newHeight = size.currHeight + size.offsetY;
    newWidth = newHeight * (size.currWidth / size.currHeight);
  }

  return {
    height: newHeight,
    width: newWidth,
  };
}

function draggerMove(event: globalThis.MouseEvent, size: any) {
  const { currentHeight, currentWidth, currentX, currentY } = size;
  var newHeight = currentHeight + (event.pageY - currentY);
  var newWidth = currentWidth + (event.pageX - currentX);

  var newSize = calculateNewSize({
    currHeight: currentHeight,
    currWidth: currentWidth,
    newHeight: newHeight,
    newWidth: newWidth,
    offsetX: event.pageX - currentX,
    offsetY: event.pageY - currentY,
  });

  return newSize;
}

export default function draggerDown(
  event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
  cb: (size: { height: any; width: any }) => void
) {
  event.stopPropagation();
  event.preventDefault();
  const body = document.querySelector("body")!;
  const dragger = document.querySelector("#dragger")!;
  const { height, width } = dragger.getBoundingClientRect();

  const currentX = event.pageX;
  const currentY = event.pageY;


  const handleDraggerMove = (ev: globalThis.MouseEvent) => {
    cb(draggerMove(ev, { currentHeight: height, currentWidth: width, currentX, currentY }));
  };

  body.addEventListener("mousemove", handleDraggerMove);
  body.addEventListener("mouseup", () => {
    body.removeEventListener("mousemove", handleDraggerMove);
  });
}
