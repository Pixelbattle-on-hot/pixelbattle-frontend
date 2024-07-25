import { useState } from "react";
import { Palette, ActiveColorContext } from "./components/Palette.tsx";
import { Footer } from "./components/Footer.tsx";
import { Canvas } from "./components/Canvas.tsx";

export function Home() {
  const [currentActiveColor, setCurrentActiveColor] = useState<number>(-1);
  return (
    <ActiveColorContext.Provider value={currentActiveColor}>
      <main className="flex h-dvh flex-col items-center justify-between">
        <header>₸ 250</header>
        <Canvas />
        <div className="flex flex-col">
          <div>(11, 22) 0.48 USDT</div>
          <button>Paint</button>
        </div>
        <div className="bg-lightBackground flex w-full flex-col">
          <Palette setActiveColorContext={setCurrentActiveColor} />
          <Footer />
        </div>
      </main>
    </ActiveColorContext.Provider>
  );
}
