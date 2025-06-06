import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./global.css";
import { ThemeProvider } from "./util/ThemeContext";

// pages'
import App from "./App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GameFAQ from "./pages/GameFAQ";
import Quizz1 from "./pages/Quizz1";
import Quizz2 from "./pages/Quizz2";
import Quizz3 from "./pages/Quizz3";
import GameTurn from "./pages/GameTurn";
import GameBuzz from "./pages/GameBuzz";
import Winner from "./pages/Winner";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "faq",
        element: <GameFAQ />,
      },
      {
        path: "numberofplayers",
        element: <Quizz1 />,
      },
      {
        path: "names",
        element: <Quizz2 />,
      },
      {
        path: "questions",
        element: <Quizz3 />,
      },
      {
        path: "gameTurn",
        element: <GameTurn />,
      },
      {
        path: "gameFirstBuzz",
        element: <GameBuzz />,
      },
      {
        path:"winner",
        element: <Winner />
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
