import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import Search from "../Search";
import { fetchFilm } from "../../../services/omdb-api-services";
import { mockFilm, invalidYearInput } from "../../../testData/mockData";

jest.mock("../../../services/omdb-api-services");

describe("verify Search renders correctly", () => {
  const mockSetFilmData = jest.fn();
  const mockSetIntro = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws an error upon empty title input", () => {
    const searchComponent = render(
      <Search setFilmData={mockSetFilmData} setIntro={mockSetIntro} />
    );
    const titleInput = searchComponent.getByRole("textbox");
    const searchButton = searchComponent.getByRole("button");
    act(() => {
      fireEvent.click(searchButton);
    });
    expect(titleInput).toBeInvalid();
  });

  it("shows the error message when title input is a space", () => {
    const searchComponent = render(
      <Search setFilmData={mockSetFilmData} setIntro={mockSetIntro} />
    );
    const titleInput = searchComponent.getByRole("textbox");
    const searchButton = searchComponent.getByRole("button");
    act(() => {
      fireEvent.change(titleInput, { target: { value: " " } });
      fireEvent.click(searchButton);
    });
    const errorMessage = searchComponent.getByText("You must enter a title!");
    expect(errorMessage).toBeVisible();
  });

  it("throws an error when year input is out of range", () => {
    const searchComponent = render(
      <Search setFilmData={mockSetFilmData} setIntro={mockSetIntro} />
    );
    const titleInput = searchComponent.getByRole("textbox");
    const yearInput = searchComponent.getByRole("spinbutton");
    const searchButton = searchComponent.getByRole("button");
    invalidYearInput.forEach((year) => {
      act(() => {
        fireEvent.change(titleInput, { target: { value: mockFilm.Title } });
        fireEvent.change(yearInput, { target: { value: year } });
        fireEvent.click(searchButton);
      });
      expect(yearInput).toBeInvalid();
    });
  });

  it("renders the spinner while retrieving API response", async () => {
    fetchFilm.mockResolvedValueOnce(mockFilm);
    const searchComponent = render(
      <Search setFilmData={mockSetFilmData} setIntro={mockSetIntro} />
    );
    const titleInput = searchComponent.getByRole("textbox");
    const yearInput = searchComponent.getByRole("spinbutton");
    const searchButton = searchComponent.getByRole("button");
    act(() => {
      fireEvent.change(titleInput, { target: { value: mockFilm.Title } });
      fireEvent.change(yearInput, { target: { value: "" } });
      fireEvent.click(searchButton);
    });
    const spinner = searchComponent.getByRole("status");
    expect(spinner).toBeVisible();
    await waitFor(() => {
      expect(spinner).not.toBeInTheDocument();
    });
  });

  it("renders the error message when retrieving API response fails", async () => {
    const mockError = new Error("Network error.");
    fetchFilm.mockRejectedValueOnce(mockError);
    const searchComponent = render(
      <Search setFilmData={mockSetFilmData} setIntro={mockSetIntro} />
    );
    const titleInput = searchComponent.getByRole("textbox");
    const yearInput = searchComponent.getByRole("spinbutton");
    const searchButton = searchComponent.getByRole("button");
    act(() => {
      fireEvent.change(titleInput, { target: { value: mockFilm.Title } });
      fireEvent.change(yearInput, { target: { value: "" } });
      fireEvent.click(searchButton);
    });
    await waitFor(() => {
      expect(
        searchComponent.getByText("There was an issue retrieving the film.")
      ).toBeInTheDocument();
    });
    const errorMessage = searchComponent.getByText(
      "There was an issue retrieving the film."
    );
    expect(errorMessage).toBeVisible();
  });
});
