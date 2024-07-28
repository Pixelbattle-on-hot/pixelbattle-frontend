import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource-variable/orbitron";
import "./index.css";
import { HotWalletProvider } from "./HotWalletProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HotWalletProvider>
      <RouterProvider router={router} />
    </HotWalletProvider>
  </React.StrictMode>,
);
