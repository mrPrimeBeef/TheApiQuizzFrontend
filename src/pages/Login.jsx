// react
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

// util
import facade from "../util/apiFacade";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {loggedIn, setLoggedIn} = useOutletContext();

  const init = {
    loginusername: "",
    loginpassword: "",
    regusername: "",
    regpassword: "",
  };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    setError(null);

    facade
      .login(loginCredentials.loginusername, loginCredentials.loginpassword)
      .then(() => {
        setLoggedIn(true);
        navigate("/home");
      })
      .catch((err) => {
        setError("Login failed - please check your username and password");
        console.error(err);
      });
  };

  const performRegister = (evt) => {
    evt.preventDefault();
    setError(null);

    facade
      .regiser(loginCredentials.regusername, loginCredentials.regpassword)
      .then(() => {
        setLoggedIn(true);
      })
      .catch((err) => {
        setError("Registration failed - " + err.message);
        console.error(err);
      });
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <>
        <div className={styles.loginBox}>
          <div>
            <h2>Login</h2>
            <form onSubmit={performLogin}>
              <input
                placeholder="User Name"
                id="loginusername"
                onChange={onChange}
                value={loginCredentials.loginusername}
              />
              <input
                placeholder="Password"
                type="password"
                id="loginpassword"
                onChange={onChange}
                value={loginCredentials.loginpassword}
              />
              {error && <div className={styles.error}>{error}</div>}
              <button type="submit">Login</button>
            </form>
          </div>

          <div className={styles.seperator}></div>
          <br></br>

          <div>
            <h2>Register</h2>
            <form onSubmit={performRegister}>
              <input
                placeholder="User Name"
                id="regusername"
                onChange={onChange}
                value={loginCredentials.regusername}
              />
              <input
                placeholder="Password"
                type="password"
                id="regpassword"
                onChange={onChange}
                value={loginCredentials.regpassword}
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>

        <div className={styles.aboutContainer}>
          <h2>The Quiz</h2>
          <p>
            TheQuizz API is a knowledge quiz focusing on computer science as a
            proof of concept. In the future, the quiz can be expanded to cover
            other scientific topics, and possibly include riddles that can be
            solved individually. The goal is to create a fun and engaging quiz
            format that can be used in social settings, such as an activity for
            a cozy evening.
          </p>
          <p>
            It is designed to be played using a single device (mobile/computer)
            for the quiz, not multiple. Once the proof of concept is completed,
            more categories will be added.
          </p>
        </div>
      </>
    </div>
  );
}
