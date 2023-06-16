import { defineConfig } from "vite";
import { resolve } from "path";

function _resolve(dir: string) {
    return resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": _resolve("src"),
        },
    },
    server: {
        port: 33212,
    },
});