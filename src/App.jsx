// react
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// componets
import Header from "./components/Header";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";

// util
import styles from "./App.module.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Breadcrumbs />
        <Outlet context={{ loggedIn, setLoggedIn }} />
      </div>
      <Footer />
    </>
  );
}
