jest.mock("../../api/apiRequest");

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../../context/UserContext";

// Reusable wrapper
const renderWithContext = (contextValue = {}) => {
  return render(
    <MemoryRouter>
      <UserContext.Provider value={contextValue}>
        <Login />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

describe("Login", () => {
  it("renders input fields and button", () => {
    renderWithContext();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("updates state on input change", () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Pass@123" },
    });

    expect(screen.getByLabelText(/email/i).value).toBe("test@example.com");
    expect(screen.getByLabelText(/password/i).value).toBe("Pass@123");
  });

  it("calls login with form data on submit", () => {
    const mockLogin = jest.fn();
    renderWithContext({ login: mockLogin });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Pass@123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith(
      {
        email: "test@example.com",
        password: "Pass@123",
      },
      expect.any(Function) // navigate
    );
  });

  it("shows error message if present in context", () => {
    renderWithContext({ message: "Invalid credentials" });

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
