import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex w-full justify-between p-4 text-white">
      <div className="flex items-center">
        <div className="relative">
          <img src="/wallet-bg.png" className="size-16" alt={"wallet"} />
          <span className="absolute left-6 top-8 z-10 text-sm">250</span>
        </div>
        <div className="flex flex-col">
          <Link to="/top-up">
            <img src="/topup-btn.png" className="size-8" alt={"withdraw"} />
          </Link>
          <img src="/withdraw-btn.png" className="size-8" alt={"withdraw"} />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <img src="/block-count.png" className="size-16" alt={"block count"} />
          <span className="absolute left-5 top-5 z-10 text-sm">234</span>
        </div>
        <span className="text-sm">
          blocks
          <br />
          without
          <br />
          actions
        </span>
      </div>
    </header>
  );
}
