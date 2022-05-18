export const fetchImages = async (name, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const queryParams = new URLSearchParams({
    key: '25731511-e5f7726e83d52bf5fe5f97cfd',
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    page,
    per_page: 12,
  });

  const response = await fetch(`${BASE_URL}?${queryParams}`);
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(
    new Error(`There are not images with such name ${name}`)
  );
};
