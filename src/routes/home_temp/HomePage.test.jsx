jest.mock("../../api/apiRequest");
import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";
import PostContext from "../../context/PostContext";

// ✅ 1. Mock PostItem to simplify test output
jest.mock("../../components/postItem/PostItem", () => (props) => {
  return <div data-testid="post-item">{props.post.title}</div>;
});

describe("HomePage", () => {
  it("renders heading and post list", () => {
    const mockContextValue = {
      posts: [
        {
          title: "Test Property",
          price: 1000,
          location: "Charlotte",
          _id: "1",
        },
      ],
      loading: false,
      message: "",
      fetchPosts: jest.fn(),
    };

    render(
      <BrowserRouter>
        <PostContext.Provider value={mockContextValue}>
          <HomePage />
        </PostContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Explore All Properties/i)).toBeInTheDocument();
    expect(screen.getByTestId("post-item")).toHaveTextContent("Test Property");
  });

  it("shows loading when loading is true", () => {
    const mockContextValue = {
      posts: [],
      loading: true,
      message: "",
      fetchPosts: jest.fn(),
    };

    render(
      <BrowserRouter>
        <PostContext.Provider value={mockContextValue}>
          <HomePage />
        </PostContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
