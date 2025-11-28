import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This allows the ngrok tunnel to forward traffic to your localhost
    allowedHosts: true,
  },
});
