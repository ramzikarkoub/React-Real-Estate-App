// ✅ Mock apiRequest globally
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
import BuyPage from "./BuyPage";
import PostContext from "../../context/PostContext";

// ✅ Mock PostItem
jest.mock("../../components/postItem/PostItem", () => ({ post }) => (
  <div data-testid="post-item">{post.title}</div>
));

// ✅ Create reusable render helper with safe defaults
const defaultContext = {
  posts: [],
  loading: false,
  message: "",
  fetchPosts: jest.fn(),
};

const renderWithContext = (overrides = {}) => {
  const contextValue = { ...defaultContext, ...overrides };
  render(
    <PostContext.Provider value={contextValue}>
      <BuyPage />
    </PostContext.Provider>
  );
};

describe("BuyPage", () => {
  it("shows loading message", () => {
    renderWithContext({ loading: true });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error message", () => {
    renderWithContext({ message: "Error loading" });
    expect(screen.getByText(/error loading/i)).toBeInTheDocument();
  });

  it("renders post items", () => {
    const mockPosts = [
      { title: "House 1", _id: "1" },
      { title: "House 2", _id: "2" },
    ];

    renderWithContext({ posts: mockPosts });

    const items = screen.getAllByTestId("post-item");
    expect(items).toHaveLength(2);
    expect(screen.getByText("House 1")).toBeInTheDocument();
    expect(screen.getByText("House 2")).toBeInTheDocument();
  });
});
