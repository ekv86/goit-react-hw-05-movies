import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';

export const SharedLayout = () => {
  return (
    <div className={css.container}>
      <header>
        <nav>
          <Link to="/" className={css.header__link}>Home</Link>
          <Link to="/movies" className={css.header__link}>Movies</Link>
        </nav>
      </header>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet/>
      </Suspense>
    </div>
  );
};
