import devtools from 'solid-devtools/vite';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [devtools(), solidPlugin()],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
    },
    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    },
});
