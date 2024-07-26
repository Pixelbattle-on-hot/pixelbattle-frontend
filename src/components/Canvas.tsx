import { useEffect, useRef, useContext, useState } from "react";
import { ActiveColorContext } from "./Palette.tsx";
import {
  canvasSideSize,
  cellsOnOneSide,
  defaultColor,
  colors,
} from "../constants";
import { PixelsField } from "../types.ts";

export function Canvas() {
  const canvasRef = useRef(null);
  const activeColor = useContext(ActiveColorContext);
  const [showGrid, setShowGrid] = useState(activeColor !== -1);
  const [pixelsField, setPixelsField] = useState(
    new Array(cellsOnOneSide)
      .fill(defaultColor)
      .map(() => new Array(cellsOnOneSide).fill(defaultColor)),
  );

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
        drawCell(ctx, i, j, pixelsField[i][j]);
      }
    }
  };

  const paintCell = (ctx, x, y, width, height) => {
    // receives x and y in global pixels
    const cellSize = ctx.canvas.width / cellsOnOneSide;
    const kwidth = canvasSideSize / width;
    const kheight = canvasSideSize / height;
    const canvasX = x * kwidth;
    const canvasY = y * kheight;
    const cellX = Math.floor(canvasX / cellSize);
    const cellY = Math.floor(canvasY / cellSize);
    const newPixelsField = [...pixelsField];
    newPixelsField[cellX][cellY] = activeColor;
    setPixelsField(newPixelsField);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setShowGrid(activeColor !== -1);
    drawPixelsField(context, pixelsField);
    // drawCell(context, 0, 0, 12);
  }, [activeColor, pixelsField]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    drawPixelsField(context, pixelsField);
  }, [showGrid]);

  function getCursorPosition(canvas, event) {
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
        paintCell(context, ...getCursorPosition(canvas, e));
      }}
    ></canvas>
  );
}
