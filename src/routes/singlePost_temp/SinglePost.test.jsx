jest.mock("../../api/apiRequest", () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import SinglePostPage from "./SinglePost";
import PostContext from "../../context/PostContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Helper to wrap with router and context
const renderWithContext = (contextValue, postId = "123") => {
  window.history.pushState({}, "Post Page", `/${postId}`);
  return render(
    <MemoryRouter initialEntries={[`/${postId}`]}>
      <PostContext.Provider
        value={{ fetchPostById: jest.fn(), ...contextValue }}
      >
        <Routes>
          <Route path=":id" element={<SinglePostPage />} />
        </Routes>
      </PostContext.Provider>
    </MemoryRouter>
  );
};

describe("SinglePostPage", () => {
  const mockPost = {
    title: "Charming Apartment",
    price: 2000,
    address: "123 Elm St",
    city: "Charlotte",
    type: "rent",
    property: "apartment",
    bedroom: 2,
    bathroom: 1,
    images: ["https://img1.jpg", "https://img2.jpg"],
    postDetail: {
      desc: "Great place downtown!",
      utilities: "Water, Gas",
      pet: "Yes",
      size: 800,
    },
  };

  it("renders loading state", () => {
    renderWithContext({ loading: true });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error message if provided", () => {
    renderWithContext({ loading: false, message: "Post not found" });
    expect(screen.getByText(/post not found/i)).toBeInTheDocument();
  });

  it("renders post details if post is loaded", () => {
    renderWithContext({ loading: false, message: "", post: mockPost });
    expect(screen.getByText(/Charming Apartment/i)).toBeInTheDocument();
    expect(screen.getByText(/\$2,000/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Elm St/i)).toBeInTheDocument();
    expect(screen.getByText(/Charlotte/i)).toBeInTheDocument();
    expect(screen.getByText(/Great place downtown/i)).toBeInTheDocument();
    expect(screen.getByText(/Water, Gas/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByText(/800 sqft/i)).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});
