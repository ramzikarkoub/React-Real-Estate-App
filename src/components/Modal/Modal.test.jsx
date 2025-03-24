import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders children and close button", () => {
    const handleClose = jest.fn();
    render(
      <Modal onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /x/i })).toBeInTheDocument();
  });

  it("calls onClose when overlay is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal onClose={handleClose}>
        <p>Overlay Test</p>
      </Modal>
    );

    fireEvent.click(
      screen.getByText("Overlay Test").parentElement.parentElement
    );
    expect(handleClose).toHaveBeenCalled();
  });

  it("does not call onClose when modal content is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal onClose={handleClose}>
        <p>Test Content</p>
      </Modal>
    );

    fireEvent.click(screen.getByText("Test Content"));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal onClose={handleClose}>
        <p>Close Button Test</p>
      </Modal>
    );

    fireEvent.click(screen.getByRole("button", { name: /x/i }));
    expect(handleClose).toHaveBeenCalled();
  });
});
