export const getSearchItem = async (nextName, page) => {
  const API_KEY = '32771721-a281e265f6f888e53b408a54b';
  const BASE_URL = 'https://pixabay.com/api/';

  const response = await fetch(
    `${BASE_URL}?q=${nextName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(
    new Error(`There is't result with search name ${nextName}`)
  );
};
