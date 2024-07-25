import { useState } from "react";
import { Footer } from "./components/Footer.tsx";

function Key({
  children,
  onClick,
}: {
  children: React.ReactElement | string;
  onClick: () => void;
}) {
  return (
    <button
      className="border-lightBackground flex size-24 items-center justify-center rounded-2xl border-2 p-4 text-6xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function TopUp() {
  const [inputString, setInputString] = useState("");
  return (
    <main className="text-lightBackground flex h-dvh flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-8 p-4">
        <div className="flex items-center gap-2 text-5xl">
          <span>$</span>
          <div className="border-lightBackground flex h-16 w-64 justify-end rounded-xl border-2 p-2">
            <span className="text-borderNotSelected">{inputString}</span>
          </div>
        </div>
        <span className="text-warn text-center text-2xl">
          Please write a sum
          <br />
          bigger than XX$
        </span>
        <div className="grid grid-cols-3 gap-4">
          <Key onClick={() => setInputString((s) => s + "1")}>1</Key>
          <Key onClick={() => setInputString((s) => s + "2")}>2</Key>
          <Key onClick={() => setInputString((s) => s + "3")}>3</Key>
          <Key onClick={() => setInputString((s) => s + "4")}>4</Key>
          <Key onClick={() => setInputString((s) => s + "5")}>5</Key>
          <Key onClick={() => setInputString((s) => s + "6")}>6</Key>
          <Key onClick={() => setInputString((s) => s + "7")}>7</Key>
          <Key onClick={() => setInputString((s) => s + "8")}>8</Key>
          <Key onClick={() => setInputString((s) => s + "9")}>9</Key>
          <Key onClick={() => setInputString((s) => s + ".")}>.</Key>
          <Key onClick={() => setInputString((s) => s + "0")}>0</Key>
          <Key
            onClick={() =>
              setInputString((s) => {
                if (s.length > 0) {
                  return s.slice(0, s.length - 1);
                }
                return s;
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
              <path d="m12 9 6 6" />
              <path d="m18 9-6 6" />
            </svg>
          </Key>
        </div>
        <button className="bg-lightBackground text-blueBackground w-fit rounded-full px-12 py-4 text-4xl">
          Top up
        </button>
      </div>
      <Footer />
    </main>
  );
}
