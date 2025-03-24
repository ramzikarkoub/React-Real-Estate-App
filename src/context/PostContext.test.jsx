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

describe("PostContext - fetchPostById", () => {
  const mockPost = {
    title: "Test Listing",
    price: 3000,
    postDetail: { desc: "test description" },
    images: [],
  };

  it("fetches a post by ID and sets it in context", async () => {
    apiRequest.get.mockResolvedValueOnce({ data: mockPost });

    const TestComponent = () => {
      const { post, fetchPostById } = React.useContext(PostContext);

      React.useEffect(() => {
        fetchPostById("123");
      }, []);

      return <div>{post?.title || "No post"}</div>;
    };

    const mockUserContext = { checkUserLoggedIn: jest.fn() };

    const { getByText } = render(
      <UserContext.Provider value={mockUserContext}>
        <PostProvider>
          <TestComponent />
        </PostProvider>
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(getByText("Test Listing")).toBeInTheDocument();
    });
  });
});
