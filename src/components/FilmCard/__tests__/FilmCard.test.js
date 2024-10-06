import { render, waitFor, within } from "@testing-library/react";
import FilmCard from "../FilmCard";
import { fetchFilm } from "../../../services/omdb-api-services";
import * as data from "../../../testData/mockData";

jest.mock("../../../services/omdb-api-services");

describe("verify FilmCard renders correctly", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders FilmCard with all details when API response is 'True'", async () => {
    fetchFilm.mockResolvedValueOnce(data.mockFilm);
    const cardComponent = render(<FilmCard filmData={data.mockFilm} />);
    await waitFor(() => {
      expect(cardComponent.getByRole("article")).toBeInTheDocument();
    });
    const filmArticle = cardComponent.getByRole("article");
    const filmTitle = within(filmArticle).getByRole("heading", { level: 3 });
    expect(filmTitle).toHaveTextContent(data.mockFilm.Title);
    const filmDetails = within(filmArticle).getAllByRole("listitem");
    filmDetails.forEach((item) => {
      const heading = within(item).getByRole("heading").textContent;
      switch (heading) {
        case "Release Year:":
          expect(item).toHaveTextContent(data.mockFilm.Released);
          break;
        case "Runtime:":
          expect(item).toHaveTextContent(data.mockFilm.Runtime);
          break;
        case "Genre:":
          expect(item).toHaveTextContent(data.mockFilm.Genre);
          break;
        case "Director:":
          expect(item).toHaveTextContent(data.mockFilm.Director);
          break;
        case "Actors:":
          expect(item).toHaveTextContent(data.mockFilm.Actors);
          break;
        case "Plot:":
          expect(item).toHaveTextContent(data.mockFilm.Plot);
          break;
        case "IMDB Rating:":
          expect(item).toHaveTextContent(data.mockFilm.imdbRating);
          break;
        case "Awards:":
          expect(item).toHaveTextContent(data.mockFilm.Awards);
          break;
        default:
          throw new Error("Unknown paragraph in FilmCard article.");
      }
      const poster = within(filmArticle).getByRole("img");
      expect(poster).toBeVisible();
    });
  });

  it("renders an error message when API response is 'False'", async () => {
    fetchFilm.mockResolvedValueOnce(data.apiResponseFalse);
    const cardComponent = render(<FilmCard filmData={data.apiResponseFalse} />);
    await waitFor(() => {
      expect(cardComponent.getByRole("heading")).toBeInTheDocument();
    });
    const errorMessage = cardComponent.getByRole("heading");
    expect(errorMessage).toBeVisible();
    expect(errorMessage).toHaveTextContent(
      "Sorry, we couldn't find the film you're looking for. Please try again."
    );
  });

  it("doesn't render the poster element when API response for poster is 'N/A'", async () => {
    fetchFilm.mockResolvedValueOnce(data.mockPosterlessFilm);
    const cardComponent = render(
      <FilmCard filmData={data.mockPosterlessFilm} />
    );
    await waitFor(() => {
      const filmArticle = cardComponent.getByRole("article");
      expect(filmArticle).toBeInTheDocument();
      expect(filmArticle).toBeVisible();
    });
    const poster = cardComponent.queryByRole("img");
    expect(poster).not.toBeInTheDocument();
  });

  it("doesn't render awards element when API response for awards is 'N/A'", async () => {
    fetchFilm.mockResolvedValueOnce(data.mockAwardlessFilm);
    const cardComponent = render(
      <FilmCard filmData={data.mockAwardlessFilm} />
    );
    await waitFor(() => {
      expect(cardComponent.getByRole("article")).toBeInTheDocument();
    });
    const filmArticle = cardComponent.getByRole("article");
    const filmTitle = within(filmArticle).getByRole("heading", { level: 3 });
    expect(filmTitle).toHaveTextContent(data.mockAwardlessFilm.Title);
    const filmDetails = within(filmArticle).getAllByRole("listitem");
    filmDetails.forEach((item) => {
      const heading = within(item).getByRole("heading");
      expect(heading).not.toHaveTextContent("Awards:");
    });
  });
});
