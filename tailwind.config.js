/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
        Lilita: ["Lilita One", "sans-serif"],
        Audiowide: ["Audiowide", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#ff0000",
          50: "#fff1f1",
          100: "#ffdfdf",
          200: "#ffc5c5",
          300: "#ff9d9d",
          400: "#ff6464",
          500: "#ff2323",
          600: "#ff0000",
          700: "#d70000",
          800: "#b10000",
          900: "#920000",
          950: "#500000",
          card: "#D6BD98",
        },
      },
      backgroundColor: {
        glass: "rgba(255, 255, 255, 0.9)",
        "glass-dark": "rgba(0, 0, 0, 0.8)",
      },
      backdropFilter: {
        none: "none",
        blur: "blur(4px)",
        "blur-md": "blur(8px)",
        "blur-lg": "blur(12px)",
        "blur-xl": "blur(16px)",
        "blur-2xl": "blur(24px)",
        "blur-3xl": "blur(32px)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        gradient: "gradient 5s linear infinite", // Added gradient animation
      },
      keyframes: {
        gradient: {
          // Define the gradient animation
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      textShadow: {
        // Custom text shadows
        default: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Subtle shadow
        "3d": "1px 1px 2px rgba(0, 0, 0, 0.7), -1px -1px 2px rgba(255, 255, 255, 0.7)",
        glow: "0 0 8px rgba(255, 255, 255, 0.8)", // Glow effect
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      scale: {
        102: "1.02",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-textshadow"), // Add this plugin
  ],
};
