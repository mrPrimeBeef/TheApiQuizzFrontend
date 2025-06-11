//react
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// util
import styles from "./GameBuzz.module.css";
import facade from "../util/apiFacade";

// componets
import Scores from "../components/Scores";

export default function GameBuzz() {
  const location = useLocation();
  const navigate = useNavigate();

  const { gameId, gameDTO } = location.state || {};
  const [turn, setTurn] = useState(gameDTO.turn);
  const maxturns = gameDTO.questions.results.length;

  const [players, setPlayers] = useState(gameDTO.players.players);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [choices, setChoices] = useState(false);

  const currentQuestion = gameDTO.questions.results[turn];
  const currentPlayer = players[currentPlayerIndex];

  const handleClick = (name) => {
    const playerIndex = players.findIndex((player) => player.name === name);
    if (playerIndex !== -1) {
      setCurrentPlayerIndex(playerIndex);
      setChoices(true);
    }
  };

  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQuestion.correct_answer;
    const updatedPlayers = [...players];

    if (isCorrect) {
      updatedPlayers[currentPlayerIndex].points += 1;
    } else {
      updatedPlayers[currentPlayerIndex].points -= 1;
    }

    setPlayers(updatedPlayers);

    if (turn >= maxturns - 1) {
      navigate("/winner", { state: { updatedPlayers, gameId } });
      return;
    }

    setChoices(false);
    setTurn((prev) => prev + 1);
  };

  const handleSave = () => {
    facade.saveGame(gameDTO, turn, gameId);
    navigate("/home");
  };

  // could be componet - cleaner code, but not reuseable
  // Send question ids with to not use index?
  const renderChoices = () => {
    if (!choices) {
      return players.map((player, index) => (
        <button onClick={() => handleClick(player.name)} key={index}>
          {player.name}
        </button>
      ));
    }

    if (choices) {
      return (
        <div>
          <h3 className={styles.center}>{currentPlayer.name}'s answer</h3>
          {[
            ...currentQuestion.incorrect_answers,
            currentQuestion.correct_answer,
          ]
            .sort(() => Math.random() - 0.5)
            .map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer)}
                className={styles.choiceButton}
              >
                {answer}
              </button>
            ))}
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h2 className={styles.welcome}>
          Turn: {turn} out of {maxturns}
        </h2>
      </div>

      <div className={styles.questionContainer}>
        <p>{currentQuestion.question}</p>
      </div>

      {renderChoices()}

      <Scores handleSave={handleSave} players={players} />
    </div>
  );
}
