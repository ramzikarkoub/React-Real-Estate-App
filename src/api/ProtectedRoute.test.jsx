jest.mock("../api/apiRequest", () => ({}));
import React from "react";
import { render, screen } from "@testing-library/react";
import ProtectedRoute from "./ProtectedRoute";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import UserContext from "../context/UserContext";

const DashboardMock = () => <h1>Dashboard Page</h1>;
const LoginMock = () => <h1>Login Page</h1>;

const renderWithRouter = (user = null) => {
  return render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <UserContext.Provider value={{ user }}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardMock />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginMock />} />
        </Routes>
      </UserContext.Provider>
    </MemoryRouter>
  );
};

describe("ProtectedRoute", () => {
  it("redirects to login if user is not authenticated", () => {
    renderWithRouter(null);
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it("renders protected component if user is authenticated", () => {
    renderWithRouter({ username: "ramzi" });
    expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
  });
});
