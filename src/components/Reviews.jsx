import { getFilmReviews } from 'filmApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';

const Reviews = () => {
  const { id } = useParams();
  const [filmReviews, setFilmReviews] = useState([]);

  useEffect(() => {
    getFilmReviews(id)
      .then(data => {
        setFilmReviews(data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (filmReviews.length === 0) {
    return <p>We don't have any reviews for this movie</p>;
  }
  return (
    <ul>
      {filmReviews?.map(({ author, content, id }) => (
        <li key={id} className={css.reviews__item}>
          <p className={css.reviews__author}>Author: {author}</p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
