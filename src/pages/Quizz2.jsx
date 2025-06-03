// react
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// util
import styles from "./Quizz2.module.css";
import facade from "../util/apiFacade";

export default function Quizz2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerCount, gameId } = location.state || {};
  const [names, setNames] = useState([{}]);

  useEffect(() => {
    if (playerCount) {
      const tmpArr = Array(playerCount)
        .fill("")
        .map(() => ({ name: "", points: 0 }));

      setNames(tmpArr);
    }
  }, [playerCount]);

  // alternativt Q2
  // const tmpArr = Array(playerCount)
  // tmpArr[0].name = "something";  
  // tmpArr[0].points = 0;

  const handleNext = () => {
    const jsonData = {
      players: names,
    };
    
    facade
      .postNamesOfPlayers(jsonData, gameId)
      .then(() => {
        navigate("/questions", { state: { gameId } });
      })
      .catch((err) => {
        console.error("Error posting player names:", err);
      });
  };

  const handleNameChange = (index, value) => {
    const updatedNames = [...names];
    updatedNames[index].name = value;
    setNames(updatedNames);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.welcome}>Ny quiz</h1>
      </div>

      <form className={styles.namesContainer}>
        {names.map((player, index) => (
          <input
            key={index}
            placeholder={`Name${index + 1}`}
            value={player.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            className={styles.nameInput}
          />
        ))}
      </form>

      <button onClick={handleNext} className={styles.nextButton}>
        Næste
      </button>
    </div>
  );
}
