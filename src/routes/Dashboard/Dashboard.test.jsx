jest.mock("../../api/apiRequest", () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import UserContext from "../../context/UserContext";
import PostContext from "../../context/PostContext";

// Mock subcomponents
jest.mock(
  "../../components/postItem/PostItem",
  () =>
    ({ post, onEdit, onDelete }) =>
      (
        <div data-testid="post-item">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
          <p>{post.title}</p>
        </div>
      )
);

jest.mock("../../components/Modal/Modal", () => ({ children }) => (
  <div data-testid="modal">{children}</div>
));

jest.mock(
  "../../components/postForm/PostForm",
  () =>
    ({ onSubmit, onClose }) =>
      (
        <div>
          <button onClick={() => onSubmit({ title: "New Post" })}>
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      )
);

describe("Dashboard", () => {
  const mockUser = { username: "ramzi" };
  const mockPosts = [
    { _id: "1", title: "Test Post 1" },
    { _id: "2", title: "Test Post 2" },
  ];

  const userContextValue = {
    user: mockUser,
    userPosts: mockPosts,
    fetchUserPosts: jest.fn(),
  };

  const postContextValue = {
    addPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
  };

  const setup = () => {
    render(
      <UserContext.Provider value={userContextValue}>
        <PostContext.Provider value={postContextValue}>
          <Dashboard />
        </PostContext.Provider>
      </UserContext.Provider>
    );
  };

  it("renders user's listings heading", () => {
    setup();
    expect(screen.getByText(/Ramzi's Listings/i)).toBeInTheDocument();
  });

  it("displays post items", () => {
    setup();
    expect(screen.getAllByTestId("post-item")).toHaveLength(2);
  });

  it("shows modal when clicking '+ Add Listing'", () => {
    setup();
    fireEvent.click(screen.getByText(/\+ Add Listing/i));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("calls deletePost when delete is confirmed", () => {
    window.confirm = jest.fn(() => true); // simulate confirm = true
    setup();
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(postContextValue.deletePost).toHaveBeenCalledWith("1");
  });
});
