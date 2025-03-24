import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders current year and site name", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(/Ramzillow/i)).toHaveTextContent(
      `© ${year} Ramzillow. All rights reserved.`
    );
  });
});
