// util
import styles from "./error-page.module.css";
import facade from "./util/apiFacade";

// react
import { NavLink, useRouteError } from "react-router-dom";


export default function ErrorPage() {
  const token = facade.getToken();

  const navigateTo = token ? "home" : "/"; 
  
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.errorContainer}>
      <div>
      <h1>Oops!</h1>
      <p>Sorry, you used the site wrong so, an unexpected error has occurred.</p>
      <div className={styles.errorText1}>
      <NavLink to={navigateTo}>Back to safe navigation</NavLink>
      </div>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      </div>
      <div>Another element flexbox</div>
    </div>
  );
}
