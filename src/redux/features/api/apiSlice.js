// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import apiConfig from './apiConfig';

import queryString from 'query-string';

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const movieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
};

export const tvType = {
  top_rated: 'top_rated',
  popular: 'popular',
  on_the_air: 'on_the_air',
};

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    paramsSerializer: (params) =>
      queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
  }),
  endpoints: (builder) => ({
    getMovieList: builder.query({
      query: ({ type, params = { include_adult: true } }) => ({
        url: `movie/${movieType[type]}`,
        method: 'GET',
        params,
      }),
    }),
    getTvList: builder.query({
      query: ({ type, params = { include_adult: true } }) => ({
        url: `tv/${tvType[type]}`,
        method: 'GET',
        params,
      }),
    }),
    getVideos: builder.query({
      query: ({ cate, id, params = { include_adult: true } }) => {
        const url = `${category[cate]}/${id}/videos`;
        return {
          url: url,
          method: 'GET',
          params,
        };
      },
    }),
    search: builder.query({
      query: ({ cate, params = { include_adult: true, query: '' } }) => ({
        url: `search/${category[cate]}`,
        method: 'GET',
        params,
      }),
    }),
    detail: builder.query({
      query: ({ cate, id, params = { include_adult: true } }) => ({
        url: `${category[cate]}/${id}`,
        method: 'GET',
        params,
      }),
    }),
    credits: builder.query({
      query: ({ cate, id, params = { include_adult: true } }) => ({
        url: `${category[cate]}/${id}/credits`,
        method: 'GET',
        params,
      }),
    }),
    similar: builder.query({
      query: ({ cate, id, params = { include_adult: true } }) => ({
        url: `${category[cate]}/${id}/similar`,
        method: 'GET',
        params,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMovieListQuery,
  useGetTvListQuery,
  useGetVideosQuery,
  useSearchQuery,
  useDetailQuery,
  useCreditsQuery,
  useSimilarQuery,
} = apiSlice;
