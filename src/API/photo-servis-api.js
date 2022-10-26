const axios = require('axios');

const URL = 'https://pixabay.com/api/';

export default class PaxaBayServiseApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImg() {
    try {
      const response = await axios.get(`${URL}`, {
        params: {
          key: '25776093-bb4fa85787ae7c355f18a58ee',
          q: this.searchQuery,
          per_page: 40,
          page: this.page,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
        },
      });
      this.incrementPage();
      const { data } = response;
      const { hits } = data;

      console.log(data.hits);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
