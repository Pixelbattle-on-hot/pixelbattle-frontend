import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { HereWallet } from "@here-wallet/core";

type ContextType = {
  here: HereWallet | null;
  login: () => void;
  logout: () => void;
  user: { nearAccountId: string } | null;
};

const HotContext = createContext<ContextType>({
  here: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useHotWallet = () => useContext(HotContext);

export const HotWalletProvider = ({ children }: { children: ReactNode }) => {
  const [here, setHere] = useState<ContextType["here"]>(null);
  const [user, setUser] = useState<ContextType["user"]>(null);

  useEffect(() => {
    const init = async () => {
      const here = await HereWallet.connect({
        botId: "pixelbattlehot_bot/pixelbattle",
        walletId: "herewalletbot/app",
      });

      setHere(here);

      const isSignedIn = await here.isSignedIn();
      if (isSignedIn) {
        console.log("isSignedIn");
        const accountId = await here.getAccountId();
        console.log("accountId", accountId);
        setUser({ nearAccountId: accountId });
      } else {
        console.log("not signed in");
      }
    };
    init();
  }, []);

  const login = useCallback(async () => {
    if (!here) return;

    await here.authenticate();
  }, [here]);

  const logout = useCallback(() => {
    here?.signOut();
    setUser(null);
  }, [here]);

  return (
    <HotContext.Provider value={{ here, user, login, logout }}>
      {children}
    </HotContext.Provider>
  );
};
