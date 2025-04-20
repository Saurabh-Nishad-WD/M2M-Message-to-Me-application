import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Make sure to include your file paths
  ],
  theme: {
    extend: {
      fontFamily: {
        lilita: ['"Lilita One"', 'sans-serif'], // Adding Lilita One font
        caveat: ['"Caveat"', 'cursive'],

      },
    },
  },
  plugins: [    tailwindcss(),
    react()],
})
