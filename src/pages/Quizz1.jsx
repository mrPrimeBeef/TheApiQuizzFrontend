// react
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// util
import styles from "./Quizz1.module.css";
import facade from "../util/apiFacade";

export default function Quizz1() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  const enterPlayers = (evt) => {
    evt.preventDefault();
    facade
      .postNumberOfPlayers(count)
      .then((gameId) => {
        navigate("/names", {
          state: { playerCount: parseInt(count, 10), gameId },
        });
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Failed to create a new game. Server must be down. Or you dont have access");
      });
  };

  const onChange = (e) => {
    setCount(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.welcome}>Ny Quiz</h1>
      </div>

      <div className={styles.playerscontainer}>
        <div className={styles.titleBox2}>
          <h2 className={styles.welcome}>How many players</h2>
        </div>
        <form onSubmit={enterPlayers}>
          <input
            placeholder="number of players"
            type="number"
            max="4"
            min="1"
            step="1"
            id="number"
            required
            onChange={onChange}
            value={count}
          />
          <button type="submit">Next</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
