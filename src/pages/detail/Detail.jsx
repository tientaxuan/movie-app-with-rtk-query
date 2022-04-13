import React, { useEffect } from 'react';

import './detail.scss';

import { useParams } from 'react-router-dom';

import apiConfig from '../../redux/features/api/apiConfig';

import { useDetailQuery } from '../../redux/features/api/apiSlice';

import CardList from './CastList';

import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';

export const Detail = () => {
  const { category, id } = useParams();

  const { data: item, isLoading } = useDetailQuery({
    cate: category,
    id: id,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      {isLoading ? (
        'Loading'
      ) : item ? (
        <>
          <div
            className='banner'
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path,
              )})`,
            }}
          ></div>
          <div className='mb-3 movie-content container'>
            <div className='movie-content__poster'>
              <div
                className='movie-content__poster__img'
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path,
                  )})`,
                }}
              ></div>
            </div>
            <div className='movie-content__info'>
              <div className='title'>{item.title || item.name}</div>
              <div className='genres'>
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, index) => (
                    <span key={index} className='genres__item'>
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className='overview'>{item.overview}</p>
              <div className='cast'>
                <div className='section__header'>
                  <h2>Cast</h2>
                </div>
                <CardList />
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='section mb-3'>
              <VideoList id={item.id} />
            </div>
            <div className='section mb-3'>
              <div className='section__header mb-2'>
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type='similar' id={item.id} />
            </div>
          </div>
        </>
      ) : (
        'Oop'
      )}
    </>
  );
};
