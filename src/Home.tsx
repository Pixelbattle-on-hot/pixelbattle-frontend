import { useState } from "react";
import { Palette, ActiveColorContext } from "./components/Palette.tsx";
import { Footer } from "./components/Footer.tsx";
import { Canvas } from "./components/Canvas.tsx";
import { Header } from "./components/Header.tsx";
import { Buffer } from "buffer/"; // eslint-disable-line
import { HereWallet } from "@here-wallet/core";

export function Home() {
  const [currentActiveColor, setCurrentActiveColor] = useState<number>(-1);
  return (
    <ActiveColorContext.Provider value={currentActiveColor}>
      <main className="flex min-h-dvh flex-col items-center justify-between gap-4">
        <Header />
        <Canvas />
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-4 text-2xl text-white">
            <span>(11, 22)</span>
            <span>0.48 USDT</span>
          </div>
          <button className="text-blueBackground w-fit rounded-full bg-lightBackground px-12 py-2 text-4xl">
            Paint
          </button>
        </div>
        <div className="flex w-full flex-col bg-lightBackground">
          <Palette setActiveColorContext={setCurrentActiveColor} />
          <Footer />
        </div>
      </main>
    </ActiveColorContext.Provider>
  );
}
