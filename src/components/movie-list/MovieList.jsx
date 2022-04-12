import React from 'react';

import PropTypes from 'prop-types';

import './movieList.scss';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { SwiperSlide, Swiper } from 'swiper/react';

import MovieCard from '../movie-card/MovieCard';

import { category } from '../../redux/features/api/apiSlice';

import {
  useGetMovieListQuery,
  useGetTvListQuery,
  useSimilarQuery,
} from '../../redux/features/api/apiSlice';

const MovieList = (props) => {
  const skip = {
    movie:
      props.category === category.movie && props.type !== 'similar'
        ? false
        : true,
    tv:
      props.category === category.tv && props.type !== 'similar' ? false : true,
    similar: props.type === 'similar' ? false : true,
  };

  const { data: movieList, isLoading: loadingMovie } = useGetMovieListQuery(
    { type: props.type },
    { skip: skip.movie && true },
  );
  const { data: tvList, isLoading: loadingTv } = useGetTvListQuery(
    { type: props.type },
    { skip: skip.tv && true },
  );
  const {
    data: similarList,
    isLoading: loadingSimilar,
    error,
  } = useSimilarQuery(
    { cate: props.category, id: props.id },
    { skip: skip.similar && true },
  );

  console.log(skip);

  const response = !skip.movie
    ? movieList
    : !skip.tv
    ? tvList
    : !skip.similar
    ? similarList
    : [];

  const items = response?.results;
  const isLoading = loadingMovie || loadingTv || loadingSimilar;

  return (
    <div className='movie-list'>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {isLoading
          ? 'loading'
          : items
          ? items.map((item, index) => (
              <SwiperSlide key={index}>
                <MovieCard item={item} category={props.category} />
              </SwiperSlide>
            ))
          : 'error'}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
