import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "../helpers/renderWithIntl";
import ReviewsSection from "@/components/ReviewsSection";
import { fullProperty, minimalProperty } from "../fixtures/property";

describe("ReviewsSection", () => {
  it("returns null when property.reviews is undefined", () => {
    const { container } = renderWithIntl(
      <ReviewsSection property={minimalProperty} locale="en" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders title in the given locale", () => {
    renderWithIntl(<ReviewsSection property={fullProperty} locale="en" />);
    expect(screen.getByText("Reviews")).toBeInTheDocument();
  });

  it("renders title in Italian when locale is 'it'", () => {
    renderWithIntl(<ReviewsSection property={fullProperty} locale="it" />);
    expect(screen.getByText("Recensioni")).toBeInTheDocument();
  });

  it("renders reviewer author name", () => {
    renderWithIntl(<ReviewsSection property={fullProperty} locale="en" />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("renders reviewer comment in the given locale", () => {
    renderWithIntl(<ReviewsSection property={fullProperty} locale="en" />);
    expect(screen.getByText(/Great EN/)).toBeInTheDocument();
  });

  it("renders average rating display", () => {
    renderWithIntl(<ReviewsSection property={fullProperty} locale="en" />);
    expect(screen.getByText("5.0")).toBeInTheDocument();
  });
});
