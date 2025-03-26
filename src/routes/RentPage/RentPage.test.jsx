import React from "react";
import { render, screen } from "@testing-library/react";
import RentPage from "./RentPage";
import PostContext from "../../context/PostContext";

jest.mock("../../api/apiRequest", () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("../../components/postItem/PostItem", () => ({ post }) => (
  <div data-testid="post-item">{post.title}</div>
));

describe("RentPage", () => {
  const mockPosts = [{ title: "Cozy Studio" }, { title: "Luxury Condo" }];

  const contextValue = {
    posts: mockPosts,
    loading: false,
    message: "",
    fetchPosts: jest.fn(),
  };

  const renderWithContext = () =>
    render(
      <PostContext.Provider value={contextValue}>
        <RentPage />
      </PostContext.Provider>
    );

  it("renders header", () => {
    renderWithContext();
    expect(screen.getByText(/Properties for Rent/i)).toBeInTheDocument();
  });

  it("renders post items", () => {
    renderWithContext();
    expect(screen.getAllByTestId("post-item")).toHaveLength(2);
  });

  it("renders loading state", () => {
    render(
      <PostContext.Provider value={{ ...contextValue, loading: true }}>
        <RentPage />
      </PostContext.Provider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(
      <PostContext.Provider
        value={{ ...contextValue, message: "Error loading" }}
      >
        <RentPage />
      </PostContext.Provider>
    );
    expect(screen.getByText(/error loading/i)).toBeInTheDocument();
  });
});
