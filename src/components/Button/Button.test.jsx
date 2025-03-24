import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("renders with default text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies correct class based on color prop", () => {
    render(<Button color="red">Delete</Button>);
    const button = screen.getByText("Delete");
    expect(button).toHaveClass("btn-red");
  });

  it("uses default button type if none provided", () => {
    render(<Button>Default</Button>);
    const button = screen.getByText("Default");
    expect(button).toHaveAttribute("type", "button");
  });

  it("uses provided type prop", () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByText("Submit");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
