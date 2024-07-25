import "./App.css";
import { Palette } from "./components/Palette.tsx";
import { Footer } from "./components/Footer.tsx";

function App() {
  return (
    <main className="flex h-dvh flex-col items-center justify-between">
      <header>₸ 250</header>
      <canvas className="size-96 bg-white"></canvas>
      <div className="flex flex-col">
        <div>(11, 22) 0.48 USDT</div>
        <button>Paint</button>
      </div>
      <div className="bg-lightBackground flex w-full flex-col">
        <Palette />
        <Footer />
      </div>
    </main>
  );
}

export default App;
