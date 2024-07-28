import { useState } from "react";
import { Palette, ActiveColorContext } from "./components/Palette.tsx";
import { Footer } from "./components/Footer.tsx";
import { Canvas, CurrentPaintedPixelContext } from "./components/Canvas.tsx";
import { Header } from "./components/Header.tsx";
import { Pixel } from "./types.ts";
import { useHotWallet } from "./HotWalletProvider.tsx";

export function Home() {
  const [currentActiveColor, setCurrentActiveColor] = useState<number>(-1);
  const [currentPaintedPixel, setCurrentPaintedPixel] = useState<{
    x: number;
    y: number;
    content: Pixel;
    prevColor: number;
  } | null>(null);
  const { user, login } = useHotWallet();
  return (
    <ActiveColorContext.Provider value={currentActiveColor}>
      <CurrentPaintedPixelContext.Provider value={currentPaintedPixel}>
        <main className="flex min-h-dvh flex-col items-center justify-between gap-4">
          <Header />
          <Canvas
            setPaintedPixelCallback={(x, y, content, prevColor) =>
              setCurrentPaintedPixel({
                x,
                y,
                content: { ...content },
                prevColor,
              })
            }
          />
          <div className="flex flex-col items-center gap-5">
            <div className="flex gap-4 text-2xl text-white">
              <span>
                {currentPaintedPixel
                  ? `(${currentPaintedPixel.x}, ${currentPaintedPixel.y})`
                  : ""}
              </span>
              <span>
                {currentPaintedPixel
                  ? `${currentPaintedPixel.content.price} NEAR`
                  : ""}
              </span>
            </div>
            <button
              className="w-fit rounded-full bg-lightBackground px-12 py-2 text-4xl text-blueBackground disabled:opacity-50"
              disabled={user == null ? false : !currentPaintedPixel}
              onClick={
                user == null
                  ? login
                  : () => {
                      setCurrentPaintedPixel(null);
                      setCurrentActiveColor(-1);
                      // TODO: send transaction
                    }
              }
            >
              {user != null ? "Paint" : "Connect Wallet"}
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
