import { useEffect, useState } from "react";

const ThemeInput = () => {
  const [theme, setTheme] = useState("light");

  // THEME CONTROLLER
  const handleTheme = (e) => {
    const userTheme = e.target.checked ? "night" : "light";
    setTheme(userTheme);
    localStorage.setItem("theme", userTheme);
  };
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div>
      <label className="inline-flex items-center space-x-4 cursor-pointer">
        <span className="relative">
          <input
            onChange={handleTheme}
            type="checkbox"
            checked={theme === "night"}
            className="hidden peer"
          />
          <div className="w-10 h-6 rounded-full shadow-inner bg-[#111827] peer-checked:dark:bg-[#F43F5E]"></div>
          <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-100"></div>
        </span>
      </label>
    </div>
  );
};

export default ThemeInput;
