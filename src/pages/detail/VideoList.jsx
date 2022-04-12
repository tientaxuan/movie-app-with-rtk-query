import React, { useEffect, useRef } from 'react';

import { useGetVideosQuery } from '../../redux/features/api/apiSlice';

import { useParams } from 'react-router-dom';

const VideoList = () => {
  const { category, id } = useParams();
  const { data: response } = useGetVideosQuery({
    cate: category,
    id: id,
  });

  const videos = response?.results?.slice(0, 5);

  return (
    <>
      {videos?.map((item, index) => (
        <Video key={index} item={item}></Video>
      ))}
    </>
  );
};

const Video = (props) => {
  const iframeRef = useRef();
  const item = props.item;
  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);
  return (
    <div className='video'>
      <div className='video__title'>
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        title='video'
        width='100%'
      ></iframe>
    </div>
  );
};

export default VideoList;
