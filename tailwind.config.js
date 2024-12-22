/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: "hsl(39, 70%, 50%)",
        input: "hsl(39, 70%, 50%)",
        ring: "hsl(39, 70%, 50%)",
        background: "hsl(0, 0%, 0%)",
        foreground: "hsl(39, 70%, 90%)",
        primary: {
          DEFAULT: "hsl(39, 70%, 50%)",
          foreground: "hsl(0, 0%, 0%)",
        },
        secondary: {
          DEFAULT: "hsl(39, 30%, 20%)",
          foreground: "hsl(39, 70%, 90%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 100%, 50%)",
          foreground: "hsl(39, 70%, 90%)",
        },
        muted: {
          DEFAULT: "hsl(39, 30%, 20%)",
          foreground: "hsl(39, 70%, 70%)",
        },
        accent: {
          DEFAULT: "hsl(39, 70%, 50%)",
          foreground: "hsl(0, 0%, 0%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 0%)",
          foreground: "hsl(39, 70%, 90%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 0%)",
          foreground: "hsl(39, 70%, 90%)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
