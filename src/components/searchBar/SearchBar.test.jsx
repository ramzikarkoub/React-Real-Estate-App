jest.mock("../../api/apiRequest");
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "./SearchBar";

const renderWithRouter = (ui, route = "/") => {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe("SearchBar", () => {
  it("renders all fields", () => {
    renderWithRouter(<SearchBar onSearch={jest.fn()} />);

    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Property/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Max Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bedroom/i)).toBeInTheDocument();
  });

  it("calls onSearch with default filters on mount", () => {
    const mockSearch = jest.fn();
    renderWithRouter(<SearchBar onSearch={mockSearch} />);
    expect(mockSearch).toHaveBeenCalledWith({
      location: "",
      type: "any",
      property: "any",
      minPrice: "",
      maxPrice: "",
      bedroom: "",
    });
  });

  it("prevents numeric input in the City field", () => {
    const mockSearch = jest.fn();
    renderWithRouter(<SearchBar onSearch={mockSearch} />);

    const cityInput = screen.getByLabelText(/City/i);

    // Try to type a number
    fireEvent.change(cityInput, { target: { value: "123" } });

    // Should NOT update to "123"
    expect(cityInput.value).toBe("");

    // Should NOT call onSearch with "123"
    expect(mockSearch).not.toHaveBeenLastCalledWith(
      expect.objectContaining({ location: "123" })
    );
  });

  it("updates filter state when user types", () => {
    const mockSearch = jest.fn();
    renderWithRouter(<SearchBar onSearch={mockSearch} />);

    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: "Charlotte" },
    });

    expect(mockSearch).toHaveBeenLastCalledWith(
      expect.objectContaining({ location: "Charlotte" })
    );

    fireEvent.change(screen.getByLabelText(/Min Price/i), {
      target: { value: "1000" },
    });

    expect(mockSearch).toHaveBeenLastCalledWith(
      expect.objectContaining({ minPrice: "1000" })
    );
  });

  it("does not render Type field on /rent page", () => {
    renderWithRouter(<SearchBar onSearch={jest.fn()} />, "/rent");
    expect(screen.queryByLabelText(/Type/i)).not.toBeInTheDocument();
  });

  it("does not render Type field on /buy page", () => {
    renderWithRouter(<SearchBar onSearch={jest.fn()} />, "/buy");
    expect(screen.queryByLabelText(/Type/i)).not.toBeInTheDocument();
  });
});
