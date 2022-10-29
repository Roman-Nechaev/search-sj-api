import { Notify } from 'notiflix/build/notiflix-notify-aio';

import imgListTamplate from './template/markup-img-list.hbs';
import PaxaBayServiseApi from './API/photo-servis-api';
import LoadMoreBtn from './components/load-more-btn';
import ScrollBtn from './components/scroll-btn';

import SimpleLightbox from 'simplelightbox';

// Дополнительный импорт стилей
// import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryListRef = document.querySelector('.gallery');
const searchFormRef = document.querySelector('.search-form');
const opac = document.querySelector('.opacity-tes');

const paxaBayServiseApi = new PaxaBayServiseApi();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

searchFormRef.addEventListener('submit', sabmitFormOn);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onLoadMore(evt) {
  loadMoreBtn.disable();

  paxaBayServiseApi.fetchImg().then(data => {
    appendImgListTamplate(data);

    if (data.hits.length === 0) {
      console.log('А на этом все ');

      loadMoreBtn.hide();
      Notify.info('Сожалеем, но вы достигли конца результатов поиска.');
    }

    loadMoreBtn.enable();
  });
}

function sabmitFormOn(evt) {
  evt.preventDefault();

  const search = evt.currentTarget.elements.searchQuery.value;

  if (search === '') {
    console.log('поиск пуст');
    return Notify.failure('Введите запрос');
  } else {
    console.log('Поиск не пуст');
    paxaBayServiseApi.query = search;
    paxaBayServiseApi.resetPage();

    paxaBayServiseApi.fetchImg().then(hits => {
      clearImgListContainer();
      appendImgListTamplate(hits);

      loadMoreBtn.enable();
      if (hits.total === 0) {
        loadMoreBtn.hide();
        return Notify.warning('По Вашему запросу ничего не найдено.');
      } else {
        loadMoreBtn.show();

        Notify.success(`Мы нашли ${hits.total} зображений`);
        console.log(`количество изображений ${hits.total}`);
      }
    });
  }
}

function appendImgListTamplate(hits) {
  galleryListRef.insertAdjacentHTML('beforeend', imgListTamplate(hits));

  const box = new SimpleLightbox('.gallery a', {
    /* options */
    captionsData: 'alt',
    captionDelay: 250,
  });
}

function clearImgListContainer() {
  galleryListRef.innerHTML = '';
}

//////////////////////////////////////////

const scrollBtn = new ScrollBtn({
  selector: '[data-scrolling]',
});
console.log(scrollBtn);

function opesss(params) {
  let yOffset = window.pageYOffset;

  if (yOffset > 20) {
    console.log('20');
    opac.classList.remove('opacity-tes');
  } else {
    opac.classList.add('opacity-tes');

    console.log('No');
  }
}
opesss();
window.onscroll = opesss;
