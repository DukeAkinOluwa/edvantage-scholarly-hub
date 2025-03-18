
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["SF Pro Display", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        edvantage: {
          blue: "#2563eb",
          "dark-blue": "#1e40af",
          "light-blue": "#dbeafe", 
          "calendar-hover": "#D3E4FD",
          "dark-gray": "#4b5563",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "confetti": {
          "0%": { transform: "translateY(0) rotate(0)", opacity: 1 },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: 0 },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.8)", opacity: 0 },
          "60%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        "rotate-star": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out", 
        "confetti": "confetti 3s linear forwards",
        "bounce-in": "bounce-in 0.6s ease-out forwards",
        "rotate-star": "rotate-star 4s linear infinite",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
