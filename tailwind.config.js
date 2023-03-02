/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: {
            opacity: 0,
            filter: "blur(1rem),",
          },
          to: {
            opacity: 1,
          },
        },
        fadeSlideIn: {
          from: {
            opacity: 0,
            transform: "translateY(-2rem)",
          },
          to: {
            opacity: 1,
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "fade-slide-in": "fadeSlideIn 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
