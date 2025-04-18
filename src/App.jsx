import { useState, useEffect } from "react";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "nerd");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");

    if (theme === "nerd") {
      canvas.style.display = "block";
      startMatrixAnimation(canvas, ctx);
    } else {
      canvas.style.display = "none";
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "nerd" : "light"));
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-8 text-center px-4">
      <div className="flex items-baseline justify-center space-x-2 fade-in">
        <h1 className="title-dk">DKR</h1>
        <span className="title-travel">travelsnapz</span>
      </div>

      <p className="max-w-xl text-gray-600 text-lg fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
        A clean landing space for my photography and Raspberry Pi builds.
      </p>

      <button
        onClick={toggleTheme}
        className="glow-border bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-xl transition fade-in"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        Toggle Theme (Light / Nerd)
      </button>
    </main>
  );
}

function startMatrixAnimation(canvas, ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "01";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array.from({ length: columns }).fill(1);

  const draw = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  };

  clearInterval(window.matrixInterval);
  window.matrixInterval = setInterval(draw, 33);

  window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
}
