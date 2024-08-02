import {
  getContract,
  getIsGameFinished,
  getNumberOfBlocksUnchanged,
} from "../contract.ts";
import { useEffect, useState } from "react";

export function Header() {
  const [contract, setContract] = useState(null);
  const [blocksWithoutActions, setBlocksWithoutActions] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  useEffect(() => {
    if (!contract) {
      getContract().then(async (contract) => {
        setContract(contract);
        const interval = setInterval(async () => {
          if (await getIsGameFinished(contract)) {
            setIsGameFinished(true);
            clearInterval(interval);
            return;
          }
          const numberOfBlocksUnchanged =
            await getNumberOfBlocksUnchanged(contract);
          setBlocksWithoutActions(numberOfBlocksUnchanged);
        }, 1000);
      });
    }
  }, [contract]);
  return (
    <header className="flex w-full justify-between p-4 text-white">
      <div className="flex items-center">
        <div className="relative">
          <img src="/wallet-bg.png" className="size-16" alt={"wallet"} />
          <span className="absolute left-6 top-8 z-10 text-sm">250</span>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="relative">
          {isGameFinished ? (
            "Game finished"
          ) : (
            <>
              <img
                src="/block-count.png"
                className="size-16"
                alt={"block count"}
              />
              <span className="absolute left-5 top-5 z-10 text-sm">
                {blocksWithoutActions}
              </span>
            </>
          )}
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
