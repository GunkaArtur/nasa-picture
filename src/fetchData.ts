export async function fetchData(date: string) {
  try {
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=ryKeedeRejmebUmDh57G3jeiUi3emyj3d467ioGM&date=${date}`;
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}
