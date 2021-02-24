import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * @type { import('vite').UserConfig }
 */
export default {
    jsx: 'react',
    base: "./",
    plugins: [reactRefresh()],
    server: {
        open: true,
        host: 'localhost',
        port: 3000,
    },
    resolve: {
        alias: {
            '#': path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: 'docs',
    }
}
