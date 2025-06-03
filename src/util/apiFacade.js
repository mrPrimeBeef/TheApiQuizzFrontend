const dev = false;
const BASE_URL = dev 
  ? "http://localhost:7070/api/" 
  : "https://thequizzapi.sem2.dk/api/";

const LOGIN_ENDPOINT = "auth/login";
const REGISTER_ENDPOINT = "auth/register";

function handleHttpErrors(res) {
  if (!res.ok) {
    return res.json().then((err) => {
      throw new Error(err.message || `HTTP error! status: ${res.status}`);
    });
  }
  return res.json();
}
// for better "safty" use sessionStorage  sessionStorage.setItem("jwtToken", token);
const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};
// sessionStorage.getItem("jwtToken", token);
const getToken = () => {
  return localStorage.getItem("jwtToken");
};
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
};
const logout = () => {
  localStorage.removeItem("jwtToken");
};

function postNumberOfPlayers(count) {
  const options = makeOptions("POST", true, { count });
  return fetch(BASE_URL + "game/" + count, options)
    .then(handleHttpErrors)
    .then((text) => parseInt(text, 10));
}

function postNamesOfPlayers(jsonData, gameId) {
  const options = makeOptions("POST", true, jsonData);
  return fetch(`${BASE_URL}game/${gameId}/players/names`, options).then(
    handleHttpErrors
  );
}

function postGameinfo(gameId, body) {
  const options = makeOptions("POST", true, body);
  return fetch(`${BASE_URL}game/${gameId}/questions`, options).then(
    handleHttpErrors
  );
}

function saveGame(gameId, body, turn) {
  const options = makeOptions("POST", true, body);
  return fetch(`${BASE_URL}game/savegame/${gameId}/${turn}`, options).then(
    handleHttpErrors
  );
}

function getSavedGame(gameId){
  const options = makeOptions("GET", true);
  return fetch(`${BASE_URL}game/savegame/${gameId}`, options).then(handleHttpErrors);
}

const getUsername = () => {
  const token = getToken();
  if (token) {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload.username;
  }
  return "";
};

const login = (user, password) => {
  const options = makeOptions("POST", false, {
    username: user,
    password: password,
  });
  return fetch(BASE_URL + LOGIN_ENDPOINT, options)
    .then(handleHttpErrors)
    .then((res) => {
      setToken(res.token);
      return res;
    });
};

const regiser = (user, password) => {
  const options = makeOptions("POST", false, {
    username: user,
    password: password,
  });
  return fetch(BASE_URL + REGISTER_ENDPOINT, options)
    .then(handleHttpErrors)
    .then((res) => {
      return login(user, password);
    });
};

const makeOptions = (method, addToken, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (addToken && loggedIn()) {
    opts.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};

const facade = {
  makeOptions,
  setToken,
  getToken,
  getUsername,
  loggedIn,
  login,
  regiser,
  logout,
  postNumberOfPlayers,
  postNamesOfPlayers,
  postGameinfo,
  saveGame,
  getSavedGame,
};

export default facade;
