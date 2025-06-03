// react
import { useLocation } from "react-router-dom";

// util
import styles from "./Winner.module.css";

export default function Winner() {
  const location = useLocation();

  const players = location.state.updatedPlayers;
  const gameId = location.state.gameId;

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.welcome}>game id: {gameId}</h1>
      </div>
      {players
        .sort((a, b) => b.points - a.points)
        .map((player) => (
          <div className={styles.playerCard}>
            <h2>Name: {player.name}</h2>
            <h2>Points: {player.points}</h2>
          </div>
        ))}
    </div>
  );
}
