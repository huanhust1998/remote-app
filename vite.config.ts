import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ }) => ({
  server: {
    host: "::",
    port: 4201,
    origin: 'http://localhost:4201',
  },
  preview: {
    host: "::",
    port: 4201,
    origin: "http://localhost:4201",
  },
  plugins: [
    react(),
    federation({
      name: "remote_app",
      manifest: true,
      remotes: {
        shell: {
          type: "module",
          entry: "http://localhost:4200/mf-manifest.json",
          name: "shell",
          entryGlobalName: "shell",
          shareScope: "default",
        }
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": { singleton: true },
      },
      getPublicPath: `() => "http://localhost:4201/"`
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: false,
    modulePreload: false,
    target: 'esnext',
    minify: false,
    rollupOptions: {
      external: [],
    },
  },
}));
