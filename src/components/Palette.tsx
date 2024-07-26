import "./palette.css";
import { useState } from "react";
import { colors } from "../constants";
import { createContext } from "react";

function PaletteColorButton({
  n,
  color,
  isActive,
  onClickCallback,
}: {
  n: number;
  color: string;
  isActive: boolean;
  onClickCallback: (n: number) => void;
}) {
  return (
    <button
      className={`palette-color-button ${isActive ? "active" : ""}`}
      style={{ backgroundColor: color }}
      onClick={() => onClickCallback(n)}
    />
  );
}

export const ActiveColorContext = createContext(-1);

export function Palette({
  setActiveColorContext,
}: {
  setActiveColorContext: (n: number) => void;
}) {
  const [activeColor, setActiveColor] = useState<number>(-1);

  const activeColorHandler = (n: number) => {
    if (activeColor === n) {
      setActiveColor(-1);
      setActiveColorContext(-1);
      return;
    }
    setActiveColor(n);
    setActiveColorContext(n);
  };

  return (
    <div className={"palette"}>
      {/* make two rows by 8 colors per each */}
      <div className={"palette-row"}>
        {Object.values(colors)
          .slice(0, 8)
          .map((color, i) => (
            <PaletteColorButton
              n={i}
              color={color}
              key={i}
              isActive={activeColor === i}
              onClickCallback={activeColorHandler}
            />
          ))}
      </div>
      <div className={"palette-row"}>
        {Object.values(colors)
          .slice(8, 16)
          .map((color, i) => (
            <PaletteColorButton
              n={i + 8}
              color={color}
              key={i + 8}
              isActive={activeColor === i + 8}
              onClickCallback={activeColorHandler}
            />
          ))}
      </div>
    </div>
  );
}
