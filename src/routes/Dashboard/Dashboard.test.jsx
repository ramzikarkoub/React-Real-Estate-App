import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import UserContext from "../../context/UserContext";
import PostContext from "../../context/PostContext";

jest.mock("../../api/apiRequest", () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock subcomponents
jest.mock(
  "../../components/PostItem/PostItem",
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
  "../../components/PostForm/PostForm",
  () =>
    ({ onSubmit, onClose }) =>
      (
        <div data-testid="post-form">
          <button onClick={() => onSubmit({ title: "Updated Post" })}>
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

  const setup = (overrideUserContext = {}, overridePostContext = {}) => {
    const userContextValue = {
      user: mockUser,
      userPosts: mockPosts,
      fetchUserPosts: jest.fn(),
      ...overrideUserContext,
    };

    const postContextValue = {
      addPost: jest.fn(),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
      ...overridePostContext,
    };

    render(
      <UserContext.Provider value={userContextValue}>
        <PostContext.Provider value={postContextValue}>
          <Dashboard />
        </PostContext.Provider>
      </UserContext.Provider>
    );

    return { userContextValue, postContextValue };
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
    window.confirm = jest.fn(() => true);
    const { postContextValue } = setup();
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(postContextValue.deletePost).toHaveBeenCalledWith("1");
  });

  it("calls updatePost when editing and submitting", async () => {
    const { postContextValue, userContextValue } = setup();

    // Click Edit on the first post
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    // Click submit inside mocked PostForm
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(postContextValue.updatePost).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({ title: "Updated Post" })
      );
      expect(userContextValue.fetchUserPosts).toHaveBeenCalled();
    });
  });

  it("calls addPost when submitting new post", async () => {
    const { postContextValue, userContextValue } = setup();

    fireEvent.click(screen.getByText(/\+ Add Listing/i));
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(postContextValue.addPost).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Updated Post" })
      );
      expect(userContextValue.fetchUserPosts).toHaveBeenCalled();
    });
  });

  it("renders fallback when userPosts is empty", () => {
    setup({ userPosts: [] });
    expect(screen.getByText("No listing...")).toBeInTheDocument();
  });

  it("renders loading when userPosts is null", () => {
    setup({ userPosts: null });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
