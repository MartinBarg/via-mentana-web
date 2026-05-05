import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "../helpers/renderWithIntl";
import CTASection from "@/components/CTASection";

const props = {
  airbnbUrl: "https://www.airbnb.mx/rooms/test",
  title: "Ready to book?",
  subtitle: "Book your stay today.",
};

describe("CTASection", () => {
  it("renders title text", () => {
    renderWithIntl(<CTASection {...props} />);
    expect(screen.getByText("Ready to book?")).toBeInTheDocument();
  });

  it("renders subtitle text", () => {
    renderWithIntl(<CTASection {...props} />);
    expect(screen.getByText("Book your stay today.")).toBeInTheDocument();
  });

  it("renders Airbnb link with correct href", () => {
    renderWithIntl(<CTASection {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://www.airbnb.mx/rooms/test");
  });

  it("renders the 'Book on Airbnb' button text from translations", () => {
    renderWithIntl(<CTASection {...props} />);
    expect(screen.getByText("Book on Airbnb")).toBeInTheDocument();
  });
});
