import { getUser } from './API/server-request';

const searchFormRef = document.querySelector('.search-form');
searchFormRef.addEventListener('click', () => {
  console.log('f');
});
const searchFormSubmit = evt => {
  evt.preventDefault();
  const { currentTarget } = evt;
  console.log(currentTarget);
};
