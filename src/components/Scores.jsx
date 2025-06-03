import styles from "../pages/GameTurn.module.css";

export default function Scores({handleSave, players}) {
  return (
    <>
   <div className={styles.scoresContainer}>
        <h3>Scores:</h3>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player.name}: {player.points} points
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSave}>Save and Exit game</button>
      </>
  );
}