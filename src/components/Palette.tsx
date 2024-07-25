import "./palette.css";
import {useState} from "react";

function PaletteColorButton({ n, color, isActive, onClickCallback }: { n: number, color: string, isActive: boolean, onClickCallback: (n: number) => void }) {
  console.log(n);
  return (
    <button
      className={`palette-color-button ${isActive ? "active" : ""}`}
      style={{ backgroundColor: color }}
      onClick={() => onClickCallback(n)}
    />
  )
}

export function Palette() {
  const colors = {
    0: "#000000",
    1: "#454546",
    2: "#C1C3C7",
    3: "#FEF2E2",
    4: "#FCE920",
    5: "#FFA304",
    6: "#FECCA9",
    7: "#B04E39",
    8: "#FC76AC",
    9: "#FF0053",
    10: "#827699",
    11: "#6A2D53",
    12: "#31AAFA",
    13: "#20347A",
    14: "#018233",
    15: "#1BCE49",
  }

  const [activeColor, setActiveColor ] = useState<number>(-1);

  const activeColorHandler = (n: number) => {
    setActiveColor(n);
  }

  return (
    <div className={"palette"}>
      {/* make two rows by 8 colors per each */}
      <div className={"palette-row"}>
        {Object.values(colors).slice(0, 8).map((color, i) => (
          <PaletteColorButton n={i} color={color} key={i} isActive={activeColor === i} onClickCallback={activeColorHandler}/>
        ))}
      </div>
      <div className={"palette-row"}>
        {Object.values(colors).slice(8, 16).map((color, i) => (
          <PaletteColorButton n={i + 8} color={color} key={i + 8} isActive={activeColor === i + 8} onClickCallback={activeColorHandler}/>
        ))}
      </div>
    </div>
  )
}
