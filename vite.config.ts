import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site is served from projects.thiering.org/ai-chat-speed-booster
export default defineConfig({
  base: "/ai-chat-speed-booster/",
  plugins: [react()],
});
