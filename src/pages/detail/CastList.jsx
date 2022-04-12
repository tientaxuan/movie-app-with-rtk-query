import React from 'react';

import { useParams } from 'react-router';

import apiConfig from '../../redux/features/api/apiConfig';

import { useCreditsQuery } from '../../redux/features/api/apiSlice';

const CastList = (props) => {
  const { category, id } = useParams();

  const { data: response } = useCreditsQuery({ cate: category, id: id });

  const casts = response?.cast?.slice(0, 5) || [];

  return (
    <div className='casts'>
      {casts.map((item, i) => (
        <div key={i} className='casts__item'>
          <div
            className='casts__item__img'
            style={{
              backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
            }}
          ></div>
          <p className='casts__item__name'>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
