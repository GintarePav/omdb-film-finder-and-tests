const currentYearInSix = (new Date().getFullYear() + 6).toString();

export const mockFilm = {
  Title: "M",
  Released: "31 Aug 1931",
  Runtime: "99 min",
  Genre: "Crime, Mystery, Thriller",
  Director: "Fritz Lang",
  Actors: "Peter Lorre, Ellen Widmann, Inge Landgut",
  Plot: "When the police in a German city are unable to catch a child-murderer, other criminals join in the manhunt.",
  imdbRating: "8.3",
  Awards: "2 wins",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BODA4ODk3OTEzMF5BMl5BanBnXkFtZTgwMTQ2ODMwMzE@._V1_SX300.jpg",
  Response: "True",
};

export const mockAwardlessFilm = {
  Title: "The Most Dangerous Game",
  Released: "16 Sep 1932",
  Runtime: "63 min",
  Genre: "Action, Adventure, Horror",
  Director: "Irving Pichel, Ernest B. Schoedsack",
  Actors: "Joel McCrea, Fay Wray, Leslie Banks",
  Plot: "A psychotic big game hunter deliberately strands a luxury yacht on a remote island, where he begins to hunt its passengers for sport.",
  imdbRating: "7.1",
  Awards: "N/A",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMjkwMjQzYWItYWM3My00MDIyLWJmYjUtYzVkY2UxNTAyOTBjXkEyXkFqcGdeQXVyMTU0NTE4MTkz._V1_SX300.jpg",
  Response: "True",
};

export const mockPosterlessFilm = {
  Title: "The Phantom of the Opera",
  Released: "15 Nov 1925",
  Runtime: "93 min",
  Genre: "Horror",
  Director: "Rupert Julian, Lon Chaney, Ernst Laemmle",
  Actors: "Lon Chaney, Mary Philbin, Norman Kerry",
  Plot: "A mad, disfigured composer seeks love with a lovely young opera singer.",
  imdbRating: "7.5",
  Awards: "4 wins & 1 nomination",
  Poster: "N/A",
  Response: "True",
};

export const apiResponseFalse = {
  Response: "False",
  Error: "No API key provided.",
};

export const invalidYearInput = ["1899", currentYearInSix];
