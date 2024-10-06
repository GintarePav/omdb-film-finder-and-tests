import "./App.scss";
import Search from "../Search/Search";
import FilmCard from "../FilmCard/FilmCard";
import IntroImage from "../IntroImage/IntroImage";

import { useState } from "react";

const App = () => {
  const [filmData, setFilmData] = useState(null);
  const [intro, setIntro] = useState(true);
  return (
    <div className="App">
      <header className="App__header">
        <h1>Film Finder</h1>
      </header>
      <main className="App__main">
        <Search setFilmData={setFilmData} setIntro={setIntro} />
        <section className="film-card">
          {filmData && filmData.Response ? (
            <FilmCard filmData={filmData} />
          ) : (
            intro && <IntroImage />
          )}
        </section>
      </main>
      <footer className="App__footer">
        <p>&copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
