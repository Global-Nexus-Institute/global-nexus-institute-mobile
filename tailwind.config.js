/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      borderColor: {
        gnpurple: "#A050C9",
        gnLightBlue: "#2EB9C2",
        DEFAULT: "#2EB9C2",
      },
      textColor: {
        gnpurple: "#A050C9",
        gnLightBlue: "#2EB9C2",
        gntextblue: "#04F3D8",
        gnpink: "#D0376E",
        gnpinkdark: "#6A1C38",
        gndarkblue: "#19173C",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gnpurple: "#A050C9",
        gnLightBlue: "#2EB9C2",
        gntextblue: "#04F3D8",
        gnpink: "#D0376E",
        gnpinkdark: "#6A1C38",
        gndarkblue: "#19173C",
      },
    },
  },
  plugins: [],
};
