import { getTrendFilms } from 'filmApi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from '../components/Home.module.css';

const Home = () => {
  const [filmsResult, setFilmsResult] = useState([] ?? '');
  const location = useLocation();
  useEffect(() => {
    getTrendFilms()
      .then(data => {
        setFilmsResult(data.results);
      })
      .catch(error => {
        setFilmsResult(error.message);
      });
  }, []);
  return (
    <main>
      <h2>Trending todays</h2>
      {!filmsResult && <p>Sorry, we have some problem. Try again later</p>}
      <ul>
        {filmsResult?.map(({ id, title, name }) => (
          <li key={id} className={css.films__item}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {name || title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
