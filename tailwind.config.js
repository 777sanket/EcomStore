export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      spacing: {
        72: "18rem",
        80: "20rem",
        96: "24rem",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "outline-blue": "0 0 0 3px rgba(59, 130, 246, 0.5)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#374151",
            a: {
              color: "#2563eb",
              "&:hover": {
                color: "#1d4ed8",
              },
            },
          },
        },
      },
    },
  },
  plugins: [import("@tailwindcss/forms"), import("@tailwindcss/aspect-ratio")],
};
