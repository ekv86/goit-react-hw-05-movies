import { getFilmCast } from 'filmApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import imageError from 'no-photo.png'

const Cast = () => {
  const { id } = useParams();
    const [castInfo, setCastInfo] = useState([]);
    const imgPath = 'http://image.tmdb.org/t/p/w500';

  useEffect(() => {
    getFilmCast(id)
      .then(data => {
        setCastInfo(data.cast);
        console.log(data)
      })
      .catch((error) => {
      console.log(error);
    })
  }, [id]);
   
  return (
    <ul className={css.cast__list}>
      {castInfo.map(({ name, profile_path, character, id }) => (
        <li key={id} className={css.cast__item}>
          <img
            className={css.cast__img}
            src={profile_path ? imgPath + profile_path : imageError}
            alt={name}
          />
          <p>{name}</p>
          <p className={css.cast__character}>Character:</p>
          <p>{character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
