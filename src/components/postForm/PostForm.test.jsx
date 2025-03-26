import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostForm from "./PostForm";

jest.mock("../../utils/env.js", () => ({
  CLOUDINARY_URL: "https://mock-cloudinary-url.com",
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ secure_url: "http://image.com/test.jpg" }),
  })
);

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
    fetch.mockClear();
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
        imageUrls: [],
      })
    );
  });

  it("fills in initialData when provided", () => {
    const initialData = {
      title: "Existing Title",
      price: "1000",
      address: "456 Lane",
      city: "Miami",
      bedroom: "2",
      bathroom: "1",
      type: "rent",
      property: "house",
      images: [],
      postDetail: {
        desc: "Old listing",
        utilities: "Water, Internet",
        pet: "Yes",
        size: "800",
      },
    };

    setup(initialData);

    expect(screen.getByDisplayValue("Existing Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Water, Internet")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Yes")).toBeInTheDocument();
    expect(screen.getByDisplayValue("800")).toBeInTheDocument();
  });

  it("uploads image and displays preview", async () => {
    setup();

    const file = new File(["dummy"], "test.jpg", { type: "image/jpeg" });

    const fileInput = screen.getByLabelText(/Images/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText(/Upload 0/i)).toBeInTheDocument();
    });
  });

  it("removes image when delete button is clicked", async () => {
    setup();

    const file = new File(["dummy"], "test.jpg", { type: "image/jpeg" });
    fireEvent.change(screen.getByLabelText(/Images/i), {
      target: { files: [file] },
    });

    await waitFor(() => {
      expect(screen.getByAltText(/Upload 0/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /x/i }));
    await waitFor(() => {
      expect(screen.queryByAltText(/Upload 0/i)).not.toBeInTheDocument();
    });
  });

  it("calls onClose when cancel is clicked", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
