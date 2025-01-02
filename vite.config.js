import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

// https://vite.dev/config/
export default defineConfig({
  base: "/Kagumachi/",
  plugins: [react()],
  assetsInclude: ["**/*.png"],
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      util: "rollup-plugin-node-polyfills/polyfills/util",
      eventsource: "./node_modules/sockjs-client/lib/transport/browser/eventsource.js"
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
