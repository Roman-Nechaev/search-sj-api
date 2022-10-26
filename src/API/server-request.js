const axios = require('axios');
// const KEY = '25776093-bb4fa85787ae7c355f18a58ee';
const URL = 'https://pixabay.com/api/';

const PAGE = 1;
let search = '';
export async function getUser(search) {
  try {
    const response = await axios.get(`${URL}`, {
      params: {
        key: '25776093-bb4fa85787ae7c355f18a58ee',
        q: search,
        per_page: 5,
        page: PAGE,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    const { data } = response;
    // console.log(response);

    // console.log(data);
    const { hits } = data;

    console.log(hits);
    return hits;
  } catch (error) {
    console.error(error);
  }
}
