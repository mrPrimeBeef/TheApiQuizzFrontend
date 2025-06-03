import { Link, useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import styles from './Breadcrumbs.module.css';
import facade from '../util/apiFacade';

export default function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();
  const location = useLocation();
  const loggedIn = facade.loggedIn();

  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map(({ match, breadcrumb }, index) => {
        // Replace "Login" breadcrumb with "Home" if logged in
        const isLogin = match.pathname === '/';
        const displayBreadcrumb = loggedIn && isLogin ? 'Home' : breadcrumb;

        return (
          <span key={match.pathname}>
            {index !== 0 && <span className={styles.separator}>/</span>}
            {location.pathname === match.pathname ? (
              <span className={styles.current}>{displayBreadcrumb}</span>
            ) : (
              <Link to={loggedIn && isLogin ? '/home' : match.pathname}>
                {displayBreadcrumb}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}