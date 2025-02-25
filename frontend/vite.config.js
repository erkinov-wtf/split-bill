import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(),
    tailwindcss()],
    test: {
        environment: 'jsdom', // Ensures React components can be tested
        globals: true, // Allows `test` and `expect` without importing them
        setupFiles: './src/setupTests.js', // Optional, for global setup
    },
})
