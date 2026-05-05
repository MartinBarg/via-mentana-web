import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "../helpers/renderWithIntl";
import Footer from "@/components/Footer";

const props = {
  brandName: "Studio Via Mentana",
  airbnbUrl: "https://www.airbnb.mx/rooms/test",
  tagline: "An authentic experience in Rome",
};

describe("Footer", () => {
  it("renders brand name", () => {
    renderWithIntl(<Footer {...props} />);
    expect(screen.getByText("Studio Via Mentana")).toBeInTheDocument();
  });

  it("renders tagline", () => {
    renderWithIntl(<Footer {...props} />);
    expect(screen.getByText("An authentic experience in Rome")).toBeInTheDocument();
  });

  it("renders Airbnb link with correct href", () => {
    renderWithIntl(<Footer {...props} />);
    const links = screen.getAllByRole("link");
    const airbnbLink = links.find((l) => l.getAttribute("href") === props.airbnbUrl);
    expect(airbnbLink).toBeDefined();
  });

  it("renders current year in copyright", () => {
    renderWithIntl(<Footer {...props} />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
