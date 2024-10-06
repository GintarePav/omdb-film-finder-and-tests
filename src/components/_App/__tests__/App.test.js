import { render, fireEvent, waitFor, within } from "@testing-library/react";
import { act } from "react";
import App from "../App";
import { fetchFilm } from "../../../services/omdb-api-services";
import { mockFilm } from "../../../testData/mockData";

jest.mock("../../../services/omdb-api-services");

describe("verify App renders correctly", () => {
  it("renders App", () => {
    const appComponent = render(<App />);
    const headline = appComponent.getByRole("heading");
    expect(headline).toHaveTextContent("Film Finder");
    const searchTitleInput = appComponent.getByRole("textbox");
    expect(searchTitleInput).toBeVisible();
    const searchYearInput = appComponent.getByRole("spinbutton");
    expect(searchYearInput).toBeVisible();
    const searchButton = appComponent.getByRole("button");
    expect(searchButton).toHaveTextContent("Search");
    const introImage = appComponent.getByAltText(
      "A man hanging movie posters at a local cinema in Berlin, Germany."
    );
    expect(introImage).toBeVisible();
    const footer = appComponent.getByRole("contentinfo");
    expect(footer).toHaveTextContent("© 2024");
  });

  it("does not render IntroImage after a search has taken place", async () => {
    fetchFilm.mockResolvedValueOnce(mockFilm);
    const appComponent = render(<App />);
    const introImage = appComponent.getByAltText(
      "A man hanging movie posters at a local cinema in Berlin, Germany."
    );
    expect(introImage).toBeVisible();
    const searchInput = appComponent.getByRole("textbox");
    const searchButton = appComponent.getByRole("button");
    act(() => {
      fireEvent.change(searchInput, { target: { value: mockFilm.Title } });
      fireEvent.click(searchButton);
    });
    await waitFor(() => {
      const filmCard = appComponent.getByRole("article");
      expect(filmCard).toBeInTheDocument();
    });
    expect(introImage).not.toBeInTheDocument();
  });
  it("renders FilmCard when data from API is retrieved", async () => {
    fetchFilm.mockResolvedValueOnce(mockFilm);
    const appComponent = render(<App />);
    const searchInput = appComponent.getByRole("textbox");
    const searchButton = appComponent.getByRole("button");
    act(() => {
      fireEvent.change(searchInput, { target: { value: mockFilm.Title } });
      fireEvent.click(searchButton);
    });
    await waitFor(() => {
      expect(appComponent.getByRole("article")).toBeInTheDocument();
    });
    const filmCard = appComponent.getByRole("article");
    expect(filmCard).toBeVisible();
    const filmTitle = within(filmCard).getByRole("heading", { level: 3 });
    expect(filmTitle).toHaveTextContent(mockFilm.Title);
  });
});
