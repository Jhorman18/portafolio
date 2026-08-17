/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",

        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Tokens inspirados en Lusion e Igloo
        brand: {
          dark: "#090A0F",
          surface: "#11131E",
          surfaceLight: "#F8F9FD",
          surfaceMuted: "#EDEFF7",
          border: "#1E2337",
          borderLight: "#E2E5F0",
          cobalt: "#1A2FFB",
          cobaltDark: "#0016EC",
          volt: "#C1FF00",
          voltHover: "#B0EA00",
          cyan: "#00FFFF",
          purple: "#8832F7",
          coral: "#FF4C41",
          emerald: "#10B981",
        },
      },
      borderRadius: {
        pill: "6.25em",
        card: "20px",
        "card-sm": "14px",
      },
      transitionTimingFunction: {
        lusion: "cubic-bezier(0.4, 0, 0.1, 1)",
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
