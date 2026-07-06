/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16A34A",
          dark: "#0F3D2A",
          darker: "#0B2E22",
        },
        secondary: "#22C55E",
        accent: "#DCFCE7",
        ink: "#111827",
        muted: "#5B6B64",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(17, 24, 39, 0.06)",
        lift: "0 20px 45px rgba(22, 163, 74, 0.18)",
        glass: "0 8px 32px rgba(22, 163, 74, 0.15)",
      },
      backgroundImage: {
        "green-gradient": "linear-gradient(135deg, #22C55E 0%, #16A34A 55%, #0F3D2A 100%)",
        "soft-radial":
          "radial-gradient(1100px 500px at 85% -10%, rgba(22,163,74,0.10), transparent 60%), radial-gradient(700px 400px at -5% 30%, rgba(34,197,94,0.10), transparent 60%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
