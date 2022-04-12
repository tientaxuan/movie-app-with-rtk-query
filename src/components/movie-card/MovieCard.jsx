import React from 'react';

import './movieCard.scss';

import apiConfig from '../../redux/features/api/apiConfig';

import { category } from '../../redux/features/api/apiSlice';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

const MovieCard = (props) => {
  const item = props.item;

  const link = '/' + category[props.category] + '/' + item.id;

  const bg =
    item?.poster_path || item?.backdrop_path
      ? apiConfig.w500Image(item.poster_path || item.backdrop_path)
      : '';
  return (
    <Link to={link}>
      <div className='movie-card' style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className='bx bx-play'></i>
        </Button>
      </div>
      <h3 className='movie-card-title'>{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;
