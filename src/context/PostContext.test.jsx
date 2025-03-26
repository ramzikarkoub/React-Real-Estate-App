import React from "react";
import { render, waitFor } from "@testing-library/react";
import PostContext, { PostProvider } from "./PostContext";
import UserContext from "./UserContext";
import apiRequest from "../api/apiRequest";

jest.mock("../api/apiRequest", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockUserContext = { checkUserLoggedIn: jest.fn() };

const renderWithProviders = (ui) =>
  render(
    <UserContext.Provider value={mockUserContext}>
      <PostProvider>{ui}</PostProvider>
    </UserContext.Provider>
  );

describe("PostContext", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches a post by ID and sets it in context", async () => {
    const mockPost = {
      title: "Test Listing",
      postDetail: { desc: "test" },
      images: [],
    };
    apiRequest.get.mockResolvedValueOnce({ data: mockPost });

    const TestComponent = () => {
      const { post, fetchPostById } = React.useContext(PostContext);
      React.useEffect(() => {
        fetchPostById("123");
      }, []);
      return <div>{post?.title || "No post"}</div>;
    };

    const { getByText } = renderWithProviders(<TestComponent />);
    await waitFor(() => {
      expect(getByText("Test Listing")).toBeInTheDocument();
    });
  });

  it("fetches posts and sets them in context", async () => {
    const mockPosts = [{ title: "Post 1" }, { title: "Post 2" }];
    apiRequest.get.mockResolvedValueOnce({ data: mockPosts });

    const TestComponent = () => {
      const { posts, fetchPosts } = React.useContext(PostContext);
      React.useEffect(() => {
        fetchPosts();
      }, []);
      return (
        <div>
          {posts.map((p, i) => (
            <div key={i}>{p.title}</div>
          ))}
        </div>
      );
    };

    const { getByText } = renderWithProviders(<TestComponent />);
    await waitFor(() => {
      expect(getByText("Post 1")).toBeInTheDocument();
      expect(getByText("Post 2")).toBeInTheDocument();
    });
  });

  it("sets message when fetchPosts returns non-array", async () => {
    apiRequest.get.mockResolvedValueOnce({ data: { message: "No data" } });

    const TestComponent = () => {
      const { message, fetchPosts } = React.useContext(PostContext);
      React.useEffect(() => {
        fetchPosts();
      }, []);
      return <div>{message}</div>;
    };

    const { getByText } = renderWithProviders(<TestComponent />);
    await waitFor(() => {
      expect(getByText("No data")).toBeInTheDocument();
    });
  });

  it("sets error message on fetchPosts failure", async () => {
    apiRequest.get.mockRejectedValueOnce(new Error("Network error"));

    const TestComponent = () => {
      const { message, fetchPosts } = React.useContext(PostContext);
      React.useEffect(() => {
        fetchPosts();
      }, []);
      return <div>{message}</div>;
    };

    const { getByText } = renderWithProviders(<TestComponent />);
    await waitFor(() => {
      expect(
        getByText("Failed to fetch properties. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("calls addPost and refreshes user", async () => {
    apiRequest.post.mockResolvedValueOnce({});
    const TestComponent = () => {
      const { addPost } = React.useContext(PostContext);
      React.useEffect(() => {
        addPost({ title: "New Post" });
      }, []);
      return <div>Adding...</div>;
    };
    renderWithProviders(<TestComponent />);
    await waitFor(() => {
      expect(apiRequest.post).toHaveBeenCalledWith("/posts", {
        title: "New Post",
      });
      expect(mockUserContext.checkUserLoggedIn).toHaveBeenCalled();
    });
  });

  it("calls updatePost and refreshes user", async () => {
    apiRequest.put.mockResolvedValueOnce({});
    const TestComponent = () => {
      const { updatePost } = React.useContext(PostContext);
      React.useEffect(() => {
        updatePost("456", { title: "Updated Post" });
      }, []);
      return <div>Updating...</div>;
    };
    renderWithProviders(<TestComponent />);
    await waitFor(() => {
      expect(apiRequest.put).toHaveBeenCalledWith("/posts/456", {
        title: "Updated Post",
      });
      expect(mockUserContext.checkUserLoggedIn).toHaveBeenCalled();
    });
  });

  it("calls deletePost correctly", async () => {
    apiRequest.delete.mockResolvedValueOnce({});
    const TestComponent = () => {
      const { deletePost } = React.useContext(PostContext);
      React.useEffect(() => {
        deletePost("789");
      }, []);
      return <div>Deleting...</div>;
    };
    renderWithProviders(<TestComponent />);
    await waitFor(() => {
      expect(apiRequest.delete).toHaveBeenCalledWith("/posts/789");
    });
  });
});
