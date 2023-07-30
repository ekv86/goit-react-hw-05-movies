import { getSearchFilms } from 'filmApi';
import { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import css from '../components/MovieSearch.module.css';

const MovieSearch = () => {
  const [searchMovie, setSearchMovie] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    getSearchFilms(searchQuery)
      .then(data => {
        setSearchMovie(data.results);
      })
      .catch(error => {
        console.log(error);
      });
  });

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ query: form.elements.query.value });
    form.reset();
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input className={css.search__input} type="text" name="query" />
        <button className={css.search__btn} type="submit">
          Search
        </button>
      </form>
      <ul>
        {searchMovie.map(({ id, title, name }) => (
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

export default MovieSearch;
