jest.mock("../api/apiRequest", () => {
  const apiRequest = {
    get: jest.fn(),
    post: jest.fn(),
  };
  return {
    __esModule: true,
    default: apiRequest,
  };
});

import apiRequest from "../api/apiRequest";
import React, { useEffect } from "react";
import UserContext, { UserProvider } from "./UserContext";
import { render, waitFor, screen } from "@testing-library/react";

//  Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("UserContext", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("checks if user is logged in on mount", async () => {
    const userData = { username: "ramzi" };
    apiRequest.get.mockResolvedValueOnce({ data: userData });

    const TestComponent = () => {
      const { user, isLoading } = React.useContext(UserContext);
      return <p>{isLoading ? "Loading..." : user?.username}</p>;
    };

    const { getByText } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(getByText("ramzi")).toBeInTheDocument();
    });
  });

  it("handles failed login and sets error message", async () => {
    apiRequest.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    const TestComponent = () => {
      const { login, message } = React.useContext(UserContext);
      React.useEffect(() => {
        login({ email: "test", password: "wrong" }, mockNavigate);
      }, []);
      return <p>{message}</p>;
    };

    const { getByText } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("registers a user and navigates to dashboard", async () => {
    const mockUser = { user: { username: "ramzi" } };
    apiRequest.post.mockResolvedValueOnce({ data: mockUser });
    apiRequest.get.mockResolvedValueOnce({ data: [] }); // fetchUserPosts

    const TestComponent = () => {
      const { register } = React.useContext(UserContext);
      React.useEffect(() => {
        register({ email: "a", password: "123" }, mockNavigate);
      }, []);
      return <p>Registering...</p>;
    };

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  // it("logs in successfully and sets user + navigates", async () => {
  //   const mockUser = { username: "ramzi" };
  //   apiRequest.post.mockResolvedValueOnce({ data: mockUser });
  //   apiRequest.get.mockResolvedValueOnce({ data: [] }); // fetchUserPosts

  //   const TestComponent = () => {
  //     const { login, user, isLoading } = React.useContext(UserContext);
  //     useEffect(() => {
  //       login({ email: "ramzi@email.com", password: "pass" }, mockNavigate);
  //     }, []);

  //     if (isLoading) return <p>Loading...</p>;
  //     return <p>{user ? user.username : "No user"}</p>;
  //   };

  //   render(
  //     <UserProvider>
  //       <TestComponent />
  //     </UserProvider>
  //   );

  //   const usernameEl = await screen.findByText("ramzi");
  //   expect(usernameEl).toBeInTheDocument();
  //   expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  // });

  it("logs out and clears user and posts", async () => {
    apiRequest.post.mockResolvedValueOnce(); // logout

    const TestComponent = () => {
      const { logout, user, userPosts } = React.useContext(UserContext);
      React.useEffect(() => {
        logout();
      }, []);
      return (
        <div>
          <p>{user ? "Logged in" : "Logged out"}</p>
          <p>{userPosts.length}</p>
        </div>
      );
    };

    const { getByText } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(getByText("Logged out")).toBeInTheDocument();
      expect(getByText("0")).toBeInTheDocument();
    });
  });

  it("fetches user posts", async () => {
    const mockPosts = [{ title: "Listing A" }];
    apiRequest.get.mockResolvedValueOnce({ data: mockPosts });

    const TestComponent = () => {
      const { fetchUserPosts, userPosts } = React.useContext(UserContext);
      React.useEffect(() => {
        fetchUserPosts();
      }, []);
      return <p>{userPosts[0]?.title || "No posts"}</p>;
    };

    const { getByText } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(getByText("Listing A")).toBeInTheDocument();
    });
  });
});
