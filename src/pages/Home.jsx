// react
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// util
import styles from "./Home.module.css";
import facade from "../util/apiFacade";

export default function Home() {
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState("/assets/bgimg.png");
  const images = [
    "/assets/bgimg.png",
    "/assets/bgimg2.png",
    "/assets/bgimg3.png",
  ];

  const username = facade.getUsername();

  const handleClick = () => {
    setBgImage((prevImage) => {
      const currentIndex = images.indexOf(prevImage);
      const nextIndex = (currentIndex + 1) % images.length;
      const newImage = images[nextIndex];

      document.documentElement.style.setProperty(
        "--background-image",
        `url(${newImage})`
      );

      return newImage;
    });
  };

  const toGame = async () => {
    try {
      const SavedGame = await facade.getSavedGame();
      
      const navigateTo = `/game${SavedGame.gameMode}`;
      navigate(navigateTo, {
        state: { gameId: SavedGame.gameId, gameDTO: SavedGame },
      });
    } catch (error) {
      console.error("Error retrieving saved game:", error);
      alert("Could not retrieve saved game. Please start a new game.");
      navigate("/home");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.welcome}>
          Welcome <span>{username}</span>
        </h1>
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <Link to="/numberofplayers">
            <button className={styles.button}>New quiz</button>
          </Link>

          <button onClick={toGame} className={styles.button}>
            Continue quiz
          </button>

          <Link to="/faq">
            <button className={styles.button}>Game FAQ</button>
          </Link>
        </div>

        <div className={styles.rightColumn}>
          <h2 className={styles.center}>Version 1.3.3</h2>
          <p>
            Getting the quizz site up and running, as of now, turnbased quizz
            and first buzz works, more categories on their way.
          </p>
          <h3 className={styles.center2}>Semantic Versioning #.#.#</h3>
          <p>Given a version number MAJOR.MINOR.PATCH, increment the:</p>
          <p>MAJOR version when you make incompatible API changes</p>
          <p>
            MINOR version when you add functionality in a backward compatible
            manner
          </p>
          <p>PATCH version when you make backward compatible bug fixes</p>
        </div>
      </div>

      <button onClick={handleClick}>Change image art</button>
    </div>
  );
}
