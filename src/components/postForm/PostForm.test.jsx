jest.mock("../../utils/env.js", () => ({
  CLOUDINARY_URL: "https://mock-cloudinary-url.com",
}));
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostForm from "./PostForm";

const mockOnSubmit = jest.fn();
const mockOnClose = jest.fn();

const setup = (initialData = null) => {
  render(
    <PostForm
      onSubmit={mockOnSubmit}
      onClose={mockOnClose}
      initialData={initialData}
    />
  );
};

describe("PostForm", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnClose.mockClear();
  });

  it("renders all required input fields", () => {
    setup();

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Property/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bedroom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bathroom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  it("updates input values when typed", () => {
    setup();

    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    expect(titleInput.value).toBe("Test Title");
  });

  it("calls onSubmit with form data", () => {
    setup();

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Home" },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: "2000" },
    });
    fireEvent.change(screen.getByLabelText(/Address/i), {
      target: { value: "123 Street" },
    });
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: "Charlotte" },
    });
    fireEvent.change(screen.getByLabelText(/Bedroom/i), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByLabelText(/Bathroom/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Nice place" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Home",
        price: "2000",
        address: "123 Street",
        city: "Charlotte",
        bedroom: "3",
        bathroom: "2",
        postDetail: expect.objectContaining({ desc: "Nice place" }),
      })
    );
  });

  it("calls onClose when cancel is clicked", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
