import { useState } from "react";
import styles from "./GameFAQ.module.css";

export default function GameFAQ() {
  const [visibleAnswer, setVisibleAnswer] = useState(null);

  const toggleAnswer = (question) => {
    setVisibleAnswer(visibleAnswer === question ? null : question);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.welcome}>FAQ</h1>
      </div>

      <div className={styles.qContainer}>
        <div className={styles.qCard} onClick={() => toggleAnswer("q1")}>
          Game modes
        </div>
        <div className={styles.qCard} onClick={() => toggleAnswer("q2")}>
          When are there comming more categories?
        </div>
        <div className={styles.qCard} onClick={() => toggleAnswer("q3")}>
          Want somthing more?
        </div>
      </div>

      <div className={styles.aContainer}>
        <div
          className={`${styles.aCard} ${
            visibleAnswer === "q1" ? "" : styles.hidden
          }`}
        >
          There are 2 games modes available, <strong> turn based </strong> and{" "}
          <strong>First-to-buzz</strong><br></br>
          <strong>turn based</strong>, is where
          everyone gets to answer the question before points are delt.<br></br>
          <strong>First-to-buzz</strong> you as a player got to figure out who
          gets to answer the question
        </div>
        <div
          className={`${styles.aCard} ${
            visibleAnswer === "q2" ? "" : styles.hidden
          }`}
        >
          You will know looking at the patch number, 0.1 is the first working game with computer siences
        </div>
        <div
          className={`${styles.aCard} ${
            visibleAnswer === "q3" ? "" : styles.hidden
          }`}
        >
          Learn to code and make a pull request
        </div>
      </div>
    </div>
  );
}
