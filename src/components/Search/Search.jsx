import "./Search.scss";
import { fetchFilm } from "../../services/omdb-api-services";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";

const Search = ({ setFilmData, setIntro }) => {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentYearInFive = (new Date().getFullYear() + 5).toString();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const inputField = document.getElementById("film-title-search");
    e.preventDefault();
    setFilmData(null);
    setIntro(false);
    if (!formData.title.trim()) {
      setError("You must enter a title!");
      inputField.focus();
    } else {
      setError("");
      setLoading(true);
      try {
        const filmFetched = await fetchFilm(formData.title, formData.year);
        setFilmData(filmFetched);
      } catch (error) {
        console.error(error);
        setError("There was an issue retrieving the film.");
        inputField.focus();
      } finally {
        setLoading(false);
      }
    }
    setFormData({
      title: "",
      year: "",
    });
  };

  return (
    <section className="search-section">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="film-title-search"
          placeholder="Title"
          aria-label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          id="film-title-year"
          placeholder="Year"
          aria-label="Year"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          min="1900"
          max={currentYearInFive}
        />
        <button type="submit" id="search-btn" disabled={loading}>
          Search
        </button>
      </form>
      {!loading ? (
        <span
          id="search-msg"
          className="search-section__empty-message"
          aria-live="polite"
        >
          {error}
        </span>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default Search;
