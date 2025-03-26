jest.mock("../../api/apiRequest");

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "./Nav";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../../context/UserContext";

const renderNavWithUser = (user = null, logout = jest.fn()) => {
  return render(
    <BrowserRouter>
      <UserContext.Provider value={{ user, logout }}>
        <Nav />
      </UserContext.Provider>
    </BrowserRouter>
  );
};

describe("Nav", () => {
  it("renders logo and site name", () => {
    renderNavWithUser();

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByText(/ramzillow/i)).toBeInTheDocument();
  });

  it("shows Login and Register when user is not logged in", () => {
    renderNavWithUser(null);

    expect(screen.getAllByText(/login/i)).toHaveLength(2);
    expect(screen.getAllByText(/register/i)).toHaveLength(2);
    expect(screen.queryAllByText(/dashboard/i)).toHaveLength(0);
    expect(screen.queryAllByText(/logout/i)).toHaveLength(0);
  });

  it("shows Dashboard and Logout when user is logged in", () => {
    const mockUser = { username: "ramzi" };
    const mockLogout = jest.fn();

    renderNavWithUser(mockUser, mockLogout);

    expect(screen.getAllByText(/dashboard/i)).toHaveLength(2);
    expect(screen.getAllByText(/logout/i)).toHaveLength(2);
    expect(screen.getByText(/welcome ramzi/i)).toBeInTheDocument();
  });

  it("calls logout when logout link is clicked", () => {
    const mockLogout = jest.fn();
    const mockUser = { username: "ramzi" };

    renderNavWithUser(mockUser, mockLogout);

    fireEvent.click(screen.getAllByText(/logout/i)[0]);
    expect(mockLogout).toHaveBeenCalled();
  });

  it("toggles mobile menu on hamburger click and closes on link click", () => {
    renderNavWithUser();

    const hamburger = screen.getByTestId("hamburger");
    fireEvent.click(hamburger);

    const mobileMenu = screen.getAllByText("Home")[1].closest(".mobile-menu");
    expect(mobileMenu).toHaveClass("active");

    fireEvent.click(screen.getAllByText("Rent")[1]);
    expect(mobileMenu).not.toHaveClass("active");
  });
});
