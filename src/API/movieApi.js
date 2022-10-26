const axios = require('axios');
import apiSrttings from './settingsMovie';

const { movieAPIUrl, movieKey } = apiSrttings;

export const getPopuletMovies = (page = 1) => {
  return axios.get(`${movieAPIUrl}/movie/popular`, {
    params: {
      api_key: movieKey,
      page: page,
    },
  });
};

// 76ed63f80dba3e42bfe198c0806fa9ba
