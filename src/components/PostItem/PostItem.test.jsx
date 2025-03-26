jest.mock("../../api/apiRequest", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostItem from "./PostItem";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../../context/UserContext";

const mockPost = {
  _id: "123",
  title: "Modern Condo",
  address: "456 Elm St",
  price: 2500,
  bedroom: 3,
  bathroom: 2,
  images: ["https://example.com/image.jpg"],
  postDetail: {
    size: 1200,
  },
  userId: {
    _id: "user123",
  },
};

const renderWithUser = (
  user = null,
  onEdit = jest.fn(),
  onDelete = jest.fn()
) => {
  return render(
    <MemoryRouter>
      <UserContext.Provider value={{ user }}>
        <PostItem post={mockPost} onEdit={onEdit} onDelete={onDelete} />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

describe("PostItem", () => {
  it("renders post details correctly", () => {
    renderWithUser();

    expect(screen.getByText("Modern Condo")).toBeInTheDocument();
    expect(screen.getByText(/456 Elm St/i)).toBeInTheDocument();
    expect(screen.getByText(/\$ 2,500/)).toBeInTheDocument();
    expect(screen.getByText(/3 bedroom/i)).toBeInTheDocument();
    expect(screen.getByText(/2 bathroom/i)).toBeInTheDocument();
    expect(screen.getByText(/1200 sq ft/i)).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(img).toHaveAttribute("alt", "Modern Condo");
  });

  it("shows Edit and Delete buttons if user owns post", () => {
    renderWithUser({ _id: "user123" });

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("does not show Edit/Delete buttons if user is not the owner", () => {
    renderWithUser({ _id: "differentUser" });

    expect(
      screen.queryByRole("button", { name: /edit/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /delete/i })
    ).not.toBeInTheDocument();
  });

  it("calls onEdit and onDelete handlers", () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    renderWithUser({ _id: "user123" }, onEdit, onDelete);

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(onEdit).toHaveBeenCalledWith(mockPost);
    expect(onDelete).toHaveBeenCalledWith(mockPost._id);
  });
});
