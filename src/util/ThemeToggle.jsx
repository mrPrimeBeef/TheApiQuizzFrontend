import { useTheme } from "./ThemeContext";
import styles from "./ThemeToggle.module.css";

//  npm install react-icons
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.button} onClick={toggleTheme}>
      {theme === "light" ? 
        <FaMoon style={{ color: '#c0c0c0' }} /> : 
        <FaSun style={{ color: '#ffd700' }} />
      }
    </button>
  );
}
