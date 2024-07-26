import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource-variable/orbitron";
import "./index.css";
import { TopUp } from "./TopUp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/top-up",
    element: <TopUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
