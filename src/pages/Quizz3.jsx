// react
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

// util
import styles from "./Quizz3.module.css";
import facade from "../util/apiFacade";

export default function Quizz3() {
  const location = useLocation();
  const navigate = useNavigate();

  const [gameInfo, setGameInfo] = useState({
    limit: 0,
    category: "",
    difficulty: "",
  });

  const [gameMode, setGameMode] = useState("");

  const { gameId } = location.state;

  const startGame = (event) => {
    event.preventDefault();

    if (!gameInfo.limit || !gameInfo.category || !gameInfo.difficulty) {
      alert(
        "Please fill out all required fields. (turnbase only gamemode avaliable right now)"
      );
      return;
    }
    facade.postGameinfo(gameId, gameInfo).then((gameDTO) => {
      navigate("/game" + gameMode, { state: { gameId, gameDTO } });
    });
  };

  const handleGameMode = (event) =>{
    const selectedGameMode = event.target.value;
    setGameMode(selectedGameMode);
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setGameInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.welcome}>Ny quiz</h1>
      </div>

      <form onSubmit={startGame}>
        <input
          placeholder="Number of questions"
          type="number"
          max="25"
          min="1"
          step="1"
          id="limit"
          required
          onChange={handleChange}
          value={gameInfo.limit}
        />

        <select
          id="category"
          required
          onChange={handleChange}
          value={gameInfo.category}
          className={styles.selectInput}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Science: Computers">Science:Computers</option>
          <option value="">Comming Soon</option>
          <option value="">Comming Soon</option>
        </select>

        <select
          id="difficulty"
          required
          onChange={handleChange}
          value={gameInfo.difficulty}
          className={styles.selectInput}
        >
          <option value="" disabled>
            Select a difficulty
          </option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>

        <select
          id="gameMode"
          onChange={handleGameMode}
          value={gameMode}
          className={styles.selectInput}
        >
          <option value="" disabled>
            Select a game mode
          </option>
          <option value="turn">Turn based</option>
          <option value="buzz">First-to-buzz</option>
        </select>

        <button type="submit">Make game</button>
      </form>
    </div>
  );
}
