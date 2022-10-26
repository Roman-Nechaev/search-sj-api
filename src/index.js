import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getUser } from './API/server-request';
import imgListTamplate from './components/imgList.hbs';
import PaxaBayServiseApi from './API/photo-servis-api';
import LoadMoreBtn from './components/load-more-btn';
import ScrollBtn from './components/scroll-btn';

// Описан в документации
import SimpleLightbox from 'simplelightbox';

// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryListRef = document.querySelector('.gallery');
const searchFormRef = document.querySelector('.search-form');
const scrollBtnRf = document.querySelector('.scrol-btn');
const opac = document.querySelector('.opacity-tes');

// scrollBtnRf.classList.add('is-hidden'); // скрыть
const paxaBayServiseApi = new PaxaBayServiseApi();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

searchFormRef.addEventListener('submit', sabmitFormOn);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onLoadMore(evt) {
  loadMoreBtn.disable(); //состояние неактивной кнопки

  paxaBayServiseApi.fetchImg().then(data => {
    appendImgListTamplate(data);

    if (data.hits.length === 0) {
      console.log('А на этом все ');

      loadMoreBtn.hide(); // скрыть кнопку
      Notify.info('Сожалеем, но вы достигли конца результатов поиска.');
    }

    loadMoreBtn.enable(); // состояние активной кнопки
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
    paxaBayServiseApi.resetPage(); // сброс страницы

    paxaBayServiseApi.fetchImg().then(hits => {
      clearImgListContainer(); // очищает форму перед новым запросом поиска
      appendImgListTamplate(hits);

      loadMoreBtn.enable(); // состояние активной кнопки
      if (hits.total === 0) {
        loadMoreBtn.hide(); // скрыть кнопку
        return Notify.warning('По Вашему запросу ничего не найдено.');
      } else {
        loadMoreBtn.show(); // показать кнопку
        // scrollBtnRf.classList.remove('is-hidden'); // показать

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

// document.querySelectorAll('a[href^="#"').forEach(link => {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();

//     let href = this.getAttribute('href').substring(1);

//     const scrollTarget = document.getElementById(href);

//     const topOffset = document.querySelector('.scrollto').offsetHeight;
//     // const topOffset = 0; // если не нужен отступ сверху
//     const elementPosition = scrollTarget.getBoundingClientRect().top;
//     const offsetPosition = elementPosition - topOffset;

//     window.scrollBy({
//       top: offsetPosition,
//       behavior: 'smooth',
//     });
//   });
// });
// let btn = document.querySelector('.scrol-btn');
// //
// function magic() {
//   if (window.pageYOffset > 20) {
//     btn.style.opacity = '1';
//   } else {
//     btn.style.opacity = '0';
//   }
// }
// function boo(params) {
//   btn.onclick = function () {
//     window.scrollTo({
//       top: searchFormRef,
//       behavior: 'smooth',
//     });
//   };
// }
// //
// boo();

// // When scrolling, we run the function
// function foo(params) {
//   window.onscroll = magic;
// }
// foo();

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
