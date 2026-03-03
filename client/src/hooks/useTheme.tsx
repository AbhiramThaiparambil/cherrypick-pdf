import { useEffect, useState } from "react";

const useTheme = () => {
  type IThemeType = "dark" | "light";
  const [theme, setTheme] = useState<IThemeType>(() => {
    return (localStorage.getItem("userTheme") as IThemeType) || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

    localStorage.setItem("userTheme", theme == "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
};

export default useTheme;
