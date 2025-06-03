// react
import { NavLink, useNavigate } from "react-router-dom";

// util
import styles from "./Header.module.css";
import ThemeToggle from "../util/ThemeToggle";
import facade from "../util/apiFacade";

export default function Header({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  const username = facade.getUsername();

  const handleClick = () => {
    facade.logout();
    setLoggedIn(false);
    navigate("/");
  };


  return (
    <header className={styles.header}>
      <NavLink to={loggedIn ? "home" : "/"}>
        <img className={styles.logoImg} src="/assets/logo.jpg" alt="logo" />
      </NavLink>

      <div className={styles.headerRight}>
        {loggedIn && (
          <span className={styles.username}>Welcome, {username}</span>
        )}
        <ThemeToggle />
        {loggedIn && (
          <button className={styles.logoutBtn} onClick={handleClick}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
