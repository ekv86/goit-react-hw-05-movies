import { getFilmDetails } from 'filmApi';
import { useState, useEffect, Suspense, useRef } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import css from '../components/MovieDetails.module.css';
import imageError from 'no-photo.png';

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  console.log(location)
  // const additionalLocation = location.state;
  const backBtn = useRef(location.state?.from ?? '/');
  const [film, setFilm] = useState({} ?? '');
  const { title, poster_path, overview, genres, vote_average } = film;
  const imgPath = 'http://image.tmdb.org/t/p/w500';
  let src = `${imgPath}${poster_path}`;
  let filmGenres = genres?.map(genre => genre.name).join(', ') ?? '';

  useEffect(() => {
    getFilmDetails(id)
      .then(data => {
        setFilm(data);
      })
      .catch(error => {
        console.log(error);
        setFilm(error.message);
      });
  }, [id]);

  return (
    <main>
      <Link to={backBtn.current} className={css.back__btn}>
        Go back
      </Link>
      {!film && <p>The resource you requested could not be found</p>}
      {film && (
        <section>
          <div className={css.film__description}>
            <img src={poster_path ? src : imageError} alt={title} />
            <div className={css.film__description_text}>
              <h3>{title}</h3>
              <p>Use score: {Math.round(vote_average * 10)}%</p>
              <p className={css.film__description_overview}>Overview</p>
              <p>{overview}</p>
              <p className={css.film__description_genres}>Genres</p>
              <p>{filmGenres}</p>
            </div>
          </div>
          <div className={css.film__additional}>
            <p>Additional information</p>
            <ul>
              <li className={css.film__additional_item}>
                <Link to="cast" state={{ from: location }}>
                  Cast
                </Link>
              </li>
              <li className={css.film__additional_item}>
                <Link to="reviews" state={{ from: location }}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}
      <Suspense fallback={<h1>Loading</h1>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetails;
