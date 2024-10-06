import "./FilmCard.scss";

const FilmCard = ({ filmData }) => {
  return filmData.Response === "True" ? (
    <article className="film-card__card-inner">
      <h3>{filmData.Title}</h3>
      <section>
        <div>
          <ul>
            <li>
              <h5>Release Year:</h5> {filmData.Released}
            </li>
            <li>
              <h5>Runtime:</h5> {filmData.Runtime}
            </li>
            <li>
              <h5>Genre:</h5> {filmData.Genre}
            </li>
            <li>
              <h5>Director:</h5> {filmData.Director}
            </li>
            <li>
              <h5>Actors:</h5> {filmData.Actors}
            </li>
            <li>
              <h5>Plot:</h5> {filmData.Plot}
            </li>
            <li>
              <h5>IMDB Rating:</h5> {filmData.imdbRating}
            </li>
            {filmData.Awards !== "N/A" && (
              <li>
                <h5>Awards:</h5> {filmData.Awards}
              </li>
            )}
          </ul>
        </div>
        {filmData.Poster !== "N/A" && (
          <div>
            <div>
              <img src={filmData.Poster} alt={`${filmData.Title} poster`} />
            </div>
          </div>
        )}
      </section>
    </article>
  ) : (
    <h4>
      Sorry, we couldn't find the film you're looking for. Please try again.
    </h4>
  );
};

export default FilmCard;
