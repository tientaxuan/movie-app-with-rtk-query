const apiConfig = {
  baseURL: 'https://api.themoviedb.org/3/',
  apiKey: '018cb6d9b2974ae5b988dbf0c306d1ca',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
};

export default apiConfig;
