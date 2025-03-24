// ✅ Mock apiRequest once at the top
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
import React from "react";
import { render, waitFor } from "@testing-library/react";
import UserContext, { UserProvider } from "./UserContext";

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
      return (
        <div>
          <p>{isLoading ? "Loading..." : user?.username}</p>
        </div>
      );
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
});
