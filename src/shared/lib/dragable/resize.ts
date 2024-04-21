type ResizeOptions = {
  currentWidth: number;
  currentHeight: number;
  currentPageX: number;
  currentPageY: number;
};

function resizeFromBottomRight({
  currentWidth,
  currentHeight,
  currentPageX,
  currentPageY,
}: ResizeOptions) {
  return (e: globalThis.MouseEvent) => {
    const width = currentWidth + (e.pageX - currentPageX);
    const height = currentHeight + (e.pageY - currentPageY);

    return { width, height };
  };
}

function resizeFromBottomLeft({
  currentWidth,
  currentHeight,
  currentPageX,
  currentPageY,
  currentX,
}: ResizeOptions & { currentX: number }) {
  return (e: globalThis.MouseEvent) => {
    const width = currentWidth - (e.pageX - currentPageX);
    const height = currentHeight + (e.pageY - currentPageY);
    const left = currentX + (e.pageX - currentPageX);

    return { width, height, left };
  };
}

function resizeFromTopRight({
  currentWidth,
  currentHeight,
  currentPageX,
  currentPageY,
  currentY,
}: ResizeOptions & { currentY: number }) {
  return (e: globalThis.MouseEvent) => {
    const width = currentWidth + (e.pageX - currentPageX);
    const height = currentHeight - (e.pageY - currentPageY);
    const top = currentY + (e.pageY - currentPageY);

    return { width, height, top };
  };
}

function resizeFromTopLeft({
  currentWidth,
  currentHeight,
  currentPageX,
  currentPageY,
  currentX,
  currentY,
}: ResizeOptions & { currentX: number; currentY: number }) {
  return (e: globalThis.MouseEvent) => {
    const width = currentWidth - (e.pageX - currentPageX);
    const height = currentHeight - (e.pageY - currentPageY);
    const left = currentX + (e.pageX - currentPageX);
    const top = currentY + (e.pageY - currentPageY);

    return { width, height, top, left };
  };
}

export {
  resizeFromBottomLeft,
  resizeFromBottomRight,
  resizeFromTopLeft,
  resizeFromTopRight,
};
