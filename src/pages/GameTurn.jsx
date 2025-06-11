// react
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

// util
import styles from "./GameTurn.module.css";
import facade from "../util/apiFacade";

// componets
import Scores from "../components/Scores";

export default function GameTurn() {
  const location = useLocation();
  const navigate = useNavigate();

  const { gameId, gameDTO } = location.state || {}; // Modtag gameId og gameDTO

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [players, setPlayers] = useState(gameDTO.players.players);
  const [answers, setAnswers] = useState([]); // Midlertidige svar for det aktuelle spørgsmål
  const [turn, setTurn] = useState(gameDTO.turn);
  const maxturns = gameDTO.questions.results.length;

  const currentQuestion = gameDTO.questions.results[turn];
  const currentPlayer = players[currentPlayerIndex];

  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQuestion.correct_answer;

    // Gem det aktuelle svar
    const currentAnswer = { player: currentPlayer.name, answer, isCorrect };

    // Skift til næste spiller
    if (currentPlayerIndex < players.length - 1) {
      setAnswers((prev) => [...prev, currentAnswer]); // Tilføj svaret til answers
      setCurrentPlayerIndex((prev) => prev + 1); // Næste spiller
    } else {
      // Alle spillere har svaret, opdater point og gå til næste spørgsmål
      const updatedPlayers = [...players];

      // Inkluder det sidste svar i pointberegningen
      const allAnswers = [...answers, currentAnswer]; // Tilføj det aktuelle svar til answers

      allAnswers.forEach((ans) => {
        const playerIndex = updatedPlayers.findIndex(
          (player) => player.name === ans.player
        );
        if (ans.isCorrect) {
          updatedPlayers[playerIndex].points += 1;
        }
      });

      // Opdater spillere og nulstil svar
      setPlayers(updatedPlayers);
      setAnswers([]); // Nulstil svar
      setCurrentPlayerIndex(0); // Reset spillerindeks

      // Gå til næste spørgsmål
      if (turn < gameDTO.questions.results.length - 1) {
        setTurn((prev) => prev + 1);
      } else {
        alert("Quiz finished!");
        navigate("/winner", { state: { gameId, updatedPlayers, gameDTO } });
      }
    }
  };

  const handleSave = () => {
    facade.saveGame(gameDTO, turn, gameId);
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h2 className={styles.welcome}>
          Turn: {turn} out of {maxturns}.
        </h2>
        <h2 className={styles.welcome}>{currentPlayer.name}'s Turn</h2>
      </div>

      <div className={styles.questionContainer}>
        <p>{currentQuestion.question}</p>
      </div>

      <div className={styles.choicesContainer}>
        {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
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
      <Scores handleSave={handleSave} players={players} />
    </div>
  );
}
