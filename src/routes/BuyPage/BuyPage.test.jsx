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

// Mock PostItem
jest.mock("../../components/PostItem/PostItem", () => ({ post }) => (
  <div data-testid="post-item">{post.title}</div>
));

const renderWithContext = (contextValue) => {
  render(
    <PostContext.Provider value={contextValue}>
      <BuyPage />
    </PostContext.Provider>
  );
};

describe("BuyPage", () => {
  const mockPosts = [
    { title: "House 1", _id: "1" },
    { title: "House 2", _id: "2" },
  ];

  it("shows loading message", () => {
    renderWithContext({ loading: true, posts: [], fetchPosts: jest.fn() });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error message", () => {
    renderWithContext({
      loading: false,
      posts: [],
      message: "Error loading",
      fetchPosts: jest.fn(),
    });
    expect(screen.getByText(/error loading/i)).toBeInTheDocument();
  });

  it("renders post items", () => {
    renderWithContext({
      loading: false,
      posts: mockPosts,
      message: "",
      fetchPosts: jest.fn(),
    });
    const items = screen.getAllByTestId("post-item");
    expect(items).toHaveLength(2);
    expect(screen.getByText("House 1")).toBeInTheDocument();
    expect(screen.getByText("House 2")).toBeInTheDocument();
  });
});
