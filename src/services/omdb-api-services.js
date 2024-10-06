export const fetchFilm = async (title, year) => {
  const url = process.env.REACT_APP_OMDB_API_URL;
  const yearQuery = process.env.REACT_APP_OMDB_API_YEAR;
  const key = process.env.REACT_APP_OMDB_API_KEY;

  const searchTitle = () => {
    let titleSearched = title.toLowerCase();
    return titleSearched.replace(" ", "+");
  };

  if (year) {
    try {
      const response = await fetch(
        `${url}${searchTitle()}${yearQuery}${year}${key}`
      );
      const filmData = await response.json();
      return filmData;
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  } else {
    try {
      const response = await fetch(`${url}${searchTitle()}${key}`);
      const filmData = await response.json();
      return filmData;
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  }
};
