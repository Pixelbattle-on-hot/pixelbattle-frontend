import { useState } from "react";
import { Palette, ActiveColorContext } from "./components/Palette.tsx";
import { Footer } from "./components/Footer.tsx";
import { Canvas, CurrentPaintedPixelContext } from "./components/Canvas.tsx";
import { Header } from "./components/Header.tsx";
import { Buffer } from "buffer/"; // eslint-disable-line
import { HereWallet } from "@here-wallet/core";

export function Home() {
  const [currentActiveColor, setCurrentActiveColor] = useState<number>(-1);
  const [currentPaintedPixel, setCurrentPaintedPixel] = useState<
    [number, number, number, number] | null
  >(null);
  return (
    <ActiveColorContext.Provider value={currentActiveColor}>
      <CurrentPaintedPixelContext.Provider value={currentPaintedPixel}>
        <main className="flex min-h-dvh flex-col items-center justify-between gap-4">
          <Header />
          <Canvas
            setPaintedPixelCallback={(x, y, color, prevColor) =>
              setCurrentPaintedPixel([x, y, color, prevColor])
            }
          />
          <div className="flex flex-col items-center gap-5">
            <div className="flex gap-4 text-2xl text-white">
              <span>
                {currentPaintedPixel
                  ? `(${currentPaintedPixel[0]}, ${currentPaintedPixel[1]})`
                  : ""}
              </span>
              <span>0.48 USDT</span> {/* TODO: get price and show here */}
            </div>
            <button
              className="w-fit rounded-full bg-lightBackground px-12 py-2 text-4xl text-blueBackground disabled:opacity-50"
              disabled={!currentPaintedPixel}
              onClick={() => {
                const [x, y, color, prevColor] = currentPaintedPixel!;
                setCurrentPaintedPixel(null);
                setCurrentActiveColor(-1);
                // TODO: send transaction
              }}
            >
              Paint
            </button>
          </div>
          <div className="flex w-full flex-col bg-lightBackground">
            <Palette setActiveColorContext={setCurrentActiveColor} />
            <Footer />
          </div>
        </main>
      </CurrentPaintedPixelContext.Provider>
    </ActiveColorContext.Provider>
  );
}
