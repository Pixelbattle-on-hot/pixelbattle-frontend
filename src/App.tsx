import { useState } from "react";
import "./App.css";
import { Palette, ActiveColorContext } from "./components/Palette.tsx";
import { Footer } from "./components/Footer.tsx";
import "./App.css";

function App() {
  const [currentActiveColor, setCurrentActiveColor] = useState<number>(-1);
  return (
    <ActiveColorContext.Provider value={currentActiveColor}>
      <main className="flex h-dvh flex-col items-center justify-between">
        <header>₸ 250</header>
        <canvas className="size-96 bg-white"></canvas>
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

export default App;
