import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { validateEnv } from "./env.validation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  validateEnv(env);

  return {
    plugins: [react()],
    base: process.env.VITE_BASE_PATH || "/",
  };
});
