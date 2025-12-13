import { Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div onClick={handleToggleTheme}>
      {theme === "light" ? <MdDarkMode size={28} /> : <Sun size={28} />}
    </div>
  );
};

export default ThemeToggle;
