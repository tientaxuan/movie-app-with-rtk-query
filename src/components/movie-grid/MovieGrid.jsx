import React, { useState, useEffect, useCallback } from 'react';

import './movieGrid.scss';

import MovieCard from '../movie-card/MovieCard';

import { useParams, useNavigate } from 'react-router-dom';

import { category, movieType, tvType } from '../../redux/features/api/apiSlice';

import { OutlineButton } from '../button/Button';

import {
  useGetMovieListQuery,
  useGetTvListQuery,
  useSearchQuery,
} from '../../redux/features/api/apiSlice';

const MovieGrid = (props) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const { keyword } = useParams();

  const skip = {
    search: keyword === undefined,
    movie: keyword !== undefined || props.category !== category.movie,
    tv: keyword !== undefined || props.category !== category.tv,
  };

  const { data: movieList, isLoading: loadingMovie } = useGetMovieListQuery(
    { type: movieType.popular, params: { page } },
    { skip: skip.movie },
  );
  const { data: tvList, isLoading: loadingTv } = useGetTvListQuery(
    { type: tvType.popular, params: { page } },
    { skip: skip.tv },
  );

  const { data: searchList, isLoading: loadingSearch } = useSearchQuery(
    { cate: props.category, params: { page, query: keyword } },
    {
      skip: skip.search,
    },
  );

  const response = !skip.search
    ? searchList
    : !skip.movie
    ? movieList
    : !skip.tv
    ? tvList
    : [];
  const isLoading = loadingMovie || loadingTv || loadingSearch;
  const items = response?.results || [];

  const totalPages = response?.total_pages;

  const loadMore = (event) => {
    setPage((page) => page + 1);
  };

  console.log(items);

  return (
    <>
      <div className='section mb-3'>
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className='movie-grid'>
        {isLoading
          ? 'Loading'
          : items
          ? items.map((item, index) => (
              <MovieCard category={props.category} item={item} key={index} />
            ))
          : ''}
      </div>
      {page < totalPages ? (
        <div className='movie-grid___loadmore'>
          <OutlineButton className='small' onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, navigate]);

  const enterEvent = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      goToSearch();
    }
  };

  return (
    <div className='movie-search'>
      <input
        type='text'
        placeholder='Enter keyword'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={enterEvent}
      ></input>
    </div>
  );
};

export default MovieGrid;
