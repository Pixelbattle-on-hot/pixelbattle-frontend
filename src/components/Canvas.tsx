import { useEffect, useRef, useContext, useState, createContext } from "react";
import { ActiveColorContext } from "./Palette.tsx";
import {
  canvasSideSize,
  cellsOnOneSide,
  defaultColor,
  colors,
  defaultPrice,
} from "../constants";
import { getContract, getFieldRow } from "../contract.ts";
import { Pixel } from "../types.ts";

export const CurrentPaintedPixelContext = createContext<{
  x: number;
  y: number;
  content: Pixel;
  prevColor: number;
} | null>(null);

export function Canvas({
  setPaintedPixelCallback,
}: {
  setPaintedPixelCallback: (
    x: number,
    y: number,
    content: Pixel,
    prevColor: number,
  ) => void;
}) {
  const canvasRef = useRef(null);
  const activeColor = useContext(ActiveColorContext);
  const paintedPixelContext = useContext(CurrentPaintedPixelContext);
  const paintedPixelContextRef = useRef(paintedPixelContext);

  const [showGrid, setShowGrid] = useState(activeColor !== -1);
  const [pixelsField, setPixelsField] = useState(
    new Array(cellsOnOneSide).fill(defaultColor).map(() =>
      new Array(cellsOnOneSide).fill({
        color: defaultColor,
        price: defaultPrice,
        owner: null,
      } as Pixel),
    ),
  );
  const [contract, setContract] = useState(null);

  const drawCell = (ctx, x, y, colorNumber) => {
    const cellSize = ctx.canvas.width / cellsOnOneSide;
    ctx.beginPath();
    ctx.fillStyle = colors[colorNumber];
    ctx.strokeStyle = "#000000";
    ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
    ctx.fill();
    if (showGrid) {
      ctx.stroke();
    }
  };

  const drawPixelsField = (ctx, pixelsField) => {
    for (let i = 0; i < pixelsField.length; i++) {
      for (let j = 0; j < pixelsField[i].length; j++) {
        drawCell(ctx, i, j, pixelsField[i][j].color);
      }
    }
  };

  const getCellPosition = (ctx, x, y, width, height) => {
    const cellSize = ctx.canvas.width / cellsOnOneSide;
    const kwidth = canvasSideSize / width;
    const kheight = canvasSideSize / height;
    const canvasX = x * kwidth;
    const canvasY = y * kheight;
    const cellX = Math.floor(canvasX / cellSize);
    const cellY = Math.floor(canvasY / cellSize);
    return [cellX, cellY];
  };

  const paintCell = (cellX, cellY) => {
    const newPixelsField = pixelsField.map((row) =>
      row.map((pixel) => ({ ...pixel }) as Pixel),
    );

    if (paintedPixelContext) {
      const prevX = paintedPixelContext.x;
      const prevY = paintedPixelContext.y;
      const prevColor = paintedPixelContext.prevColor;
      if (prevX === cellX && prevY === cellY) {
        pixelsField[cellX][cellY] = defaultColor;
      } else {
        newPixelsField[prevX][prevY].color = prevColor;
      }
    }
    newPixelsField[cellX][cellY].color = activeColor;
    setPaintedPixelCallback(
      cellX,
      cellY,
      newPixelsField[cellX][cellY],
      pixelsField[cellX][cellY].color,
    );
    setPixelsField(newPixelsField);
  };

  const loadChunkInterval = async (contract, y) => {
    const row = await getFieldRow(contract, y);

    // for (let pixel of row) {
    return row.map((pixel, i) => {
      if (
        paintedPixelContextRef.current?.x === y &&
        paintedPixelContextRef.current?.y === i
      ) {
        const newCurrentPixel = {
          ...paintedPixelContextRef.current?.content,
          price: pixel.price,
        };
        if (paintedPixelContextRef.current?.content.price !== pixel.price) {
          setPaintedPixelCallback(
            y,
            i,
            newCurrentPixel,
            paintedPixelContextRef.current?.prevColor,
          );
        }
        return newCurrentPixel;
      } else {
        return pixel;
      }
    });
  };

  useEffect(() => {
    if (!contract) {
      getContract().then(async (contract) => {
        setContract(contract);
        for (let i = 0; i < cellsOnOneSide; i++) {}
        const newPixelsField = await Promise.all(
          pixelsField.map((_, i) => loadChunkInterval(contract, i)),
        );
        setPixelsField(newPixelsField);
        setInterval(async () => {
          const newPixelsField = await Promise.all(
            pixelsField.map((_, i) => loadChunkInterval(contract, i)),
          );
          setPixelsField(newPixelsField);
        }, 5000);
      });
    }
  }, [contract, paintedPixelContextRef]);

  useEffect(() => {
    paintedPixelContextRef.current = paintedPixelContext;
  }, [paintedPixelContext]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setShowGrid(activeColor !== -1);
    drawPixelsField(context, pixelsField);
  }, [activeColor, pixelsField]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    drawPixelsField(context, pixelsField);
  }, [showGrid]);

  function getCursorPosition(canvas, event): [number, number, number, number] {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y, rect.width, rect.height];
  }

  return (
    <canvas
      className="size-96 bg-white"
      width={canvasSideSize}
      height={canvasSideSize}
      ref={canvasRef}
      onClick={(e) => {
        if (activeColor === -1) {
          return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const [x, y] = getCellPosition(
          context,
          ...getCursorPosition(canvas, e),
        );
        paintCell(x, y);
      }}
    ></canvas>
  );
}
