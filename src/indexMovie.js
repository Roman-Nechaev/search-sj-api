//! Задание к этой работе: вывести 5 кнопок (1,2,3,4,5) пагинации что бы по книку на них переходило на страницу этих кнопок, и сделать так что бы цифры сдвигаелись что бы 5 цифр постоянно было виндно

import { getPopuletMovies } from './API/movieApi';

import { generateImgPath } from './components/utilsMovie';
import movieListTemplate from './components/movieList.hbs';
import { Pagination } from './components/paginationMovie';

const moviesListRef = document.querySelector('.movies-wrappers');
const privePageRef = document.querySelector('.prive-page');
const nextPageRef = document.querySelector('.next-page');
const currentPageRef = document.querySelector('.current-page');

const handPageChange = currentPage => {
  getPopuletMovies(currentPage).then(({ data }) => {
    renderMovieList(data.results);
  });
};

const moviePagination = new Pagination({
  total: 100,
  onChange(value) {
    handPageChange(value);
    console.log(value);
    currentPageRef.textContent = value;
  },
});

nextPageRef.addEventListener('click', () => {
  moviePagination.nextPage();
});

privePageRef.addEventListener('click', () => {
  moviePagination.prevPage();
});

// document.body.innerHTML = movieCardtemplate();
const renderMovieList = movies => {
  const movieList = movies.map(movie => {
    const { original_title, poster_path } = movie;

    return {
      original_title,
      poster: generateImgPath(poster_path),
    };
  });

  moviesListRef.innerHTML = movieListTemplate(movieList);
};

getPopuletMovies().then(({ data }) => {
  const { results: movies } = data;
  renderMovieList(movies);
});
//
