jest.mock("../../api/apiRequest");
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../../context/UserContext";

// ✅ Reusable test wrapper
const renderWithContext = (contextValue = {}) => {
  return render(
    <MemoryRouter>
      <UserContext.Provider value={contextValue}>
        <Register />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

describe("Register", () => {
  it("renders all input fields", () => {
    renderWithContext();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("updates form state on user input", () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "ramzi" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "ramzi@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Secret@123" },
    });

    expect(screen.getByLabelText(/username/i).value).toBe("ramzi");
    expect(screen.getByLabelText(/email/i).value).toBe("ramzi@example.com");
    expect(screen.getByLabelText(/password/i).value).toBe("Secret@123");
  });

  it("shows error if password is invalid (missing number or special char)", () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "validUser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "abcdef" }, // invalid
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(
      screen.getByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  it("shows error if username is invalid (only numbers)", () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Pass@123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(
      screen.getByText(/username must start with a letter/i)
    ).toBeInTheDocument();
  });

  it("calls register with form data on submit", () => {
    const mockRegister = jest.fn();
    renderWithContext({ register: mockRegister });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "ramzi" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "ramzi@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Secret@123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(mockRegister).toHaveBeenCalledWith(
      {
        username: "ramzi",
        email: "ramzi@example.com",
        password: "Secret@123",
      },
      expect.any(Function) // navigate
    );
  });

  it("shows error message if present in context", () => {
    renderWithContext({ message: "Username already exists" });

    expect(screen.getByText(/username already exists/i)).toBeInTheDocument();
  });
});
