import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function trimTrailingSlash(value = "") {
  return value.replace(/\/+$/, "");
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiOrigin = trimTrailingSlash(
    env.VITE_API_ORIGIN ||
    env.VITE_API_URL?.replace(/\/api$/, "") ||
    env.VITE_API_BASE_URL?.replace(/\/api$/, "") ||
    "http://localhost:5000"
  );

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: apiOrigin,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
