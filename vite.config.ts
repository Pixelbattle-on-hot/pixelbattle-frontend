import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      process: "process/browser",
      crypto: "crypto-browserify",
      http: "stream-http",
      https: "https-browserify",
      util: "util/",
      buffer: "buffer/",
      vm: "vm-browserify",
      stream: "stream-browserify",
      url: "url/",
      events: "events/",
    },
  },
});
