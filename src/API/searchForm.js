import { getUser } from './API/server-request';

const searchFormRef = document.querySelector('.search-form');
searchFormRef.addEventListener('click', () => {});
const searchFormSubmit = evt => {
  evt.preventDefault();
  const { currentTarget } = evt;
  console.log(currentTarget);
};
