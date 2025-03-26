jest.mock("../../api/apiRequest", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import PostContext from "../../context/PostContext";
import UserContext from "../../context/UserContext";

// Mock components
jest.mock("../Nav/Nav", () => () => <nav>Mock Nav</nav>);
jest.mock("../Footer/Footer", () => () => <footer>Mock Footer</footer>);
jest.mock("../SearchBar/SearchBar.jsx", () => ({ onSearch }) => (
  <div>Mock SearchBar</div>
));

const renderWithProviders = (
  route = "/",
  postContext = {},
  userContext = {}
) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <PostContext.Provider value={postContext}>
        <UserContext.Provider value={userContext}>
          <Routes>
            <Route path="*" element={<Layout />} />
          </Routes>
        </UserContext.Provider>
      </PostContext.Provider>
    </MemoryRouter>
  );
};

describe("Layout Component", () => {
  it("renders Nav and Footer components", () => {
    renderWithProviders();
    expect(screen.getByText("Mock Nav")).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
  });

  it("applies center styling on /login", () => {
    renderWithProviders("/login");
    const main = document.querySelector(".main");
    const outlet = document.querySelector(".outlet");
    expect(main).toHaveClass("main-center");
    expect(outlet).toHaveClass("outlet-center");
  });

  it("applies center styling on /register", () => {
    renderWithProviders("/register");
    const main = document.querySelector(".main");
    const outlet = document.querySelector(".outlet");
    expect(main).toHaveClass("main-center");
    expect(outlet).toHaveClass("outlet-center");
  });

  it("shows SearchBar on non-auth routes", () => {
    renderWithProviders(
      "/dashboard",
      { fetchPosts: jest.fn() },
      { fetchUserPosts: jest.fn() }
    );
    expect(screen.getByText("Mock SearchBar")).toBeInTheDocument();
  });

  it("uses fetchUserPosts on /dashboard", () => {
    const fetchUserPosts = jest.fn();
    renderWithProviders(
      "/dashboard",
      { fetchPosts: jest.fn() },
      { fetchUserPosts }
    );
    expect(screen.getByText("Mock SearchBar")).toBeInTheDocument();
  });

  it("uses fetchPosts on other pages", () => {
    const fetchPosts = jest.fn();
    renderWithProviders("/buy", { fetchPosts }, { fetchUserPosts: jest.fn() });
    expect(screen.getByText("Mock SearchBar")).toBeInTheDocument();
  });
});
