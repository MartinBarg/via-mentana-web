import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "../helpers/renderWithIntl";
import LocationSection from "@/components/LocationSection";
import { fullProperty, minimalProperty } from "../fixtures/property";

describe("LocationSection", () => {
  it("returns null when property.location is undefined", () => {
    const { container } = renderWithIntl(
      <LocationSection property={minimalProperty} locale="en" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders title in the given locale", () => {
    renderWithIntl(<LocationSection property={fullProperty} locale="en" />);
    expect(screen.getByText("Location")).toBeInTheDocument();
  });

  it("renders title in Italian when locale is 'it'", () => {
    renderWithIntl(<LocationSection property={fullProperty} locale="it" />);
    expect(screen.getByText("Posizione")).toBeInTheDocument();
  });

  it("renders map iframe when googleMapsEmbedUrl is present", () => {
    renderWithIntl(<LocationSection property={fullProperty} locale="en" />);
    const iframes = document.querySelectorAll("iframe");
    const mapIframe = Array.from(iframes).find((f) =>
      f.src.includes("google.com/maps")
    );
    expect(mapIframe).toBeDefined();
  });

  it("does not render map iframe when googleMapsEmbedUrl is absent", () => {
    const propertyNoMap = { ...fullProperty, googleMapsEmbedUrl: undefined };
    renderWithIntl(<LocationSection property={propertyNoMap} locale="en" />);
    const iframes = document.querySelectorAll("iframe");
    const mapIframe = Array.from(iframes).find((f) =>
      f.src.includes("google.com/maps")
    );
    expect(mapIframe).toBeUndefined();
  });

  it("renders POI category labels", () => {
    renderWithIntl(<LocationSection property={fullProperty} locale="en" />);
    expect(screen.getByText("Metro")).toBeInTheDocument();
  });

  it("renders POI place names and distances", () => {
    renderWithIntl(<LocationSection property={fullProperty} locale="en" />);
    expect(screen.getByText("Castro Pretorio")).toBeInTheDocument();
    expect(screen.getByText("100m")).toBeInTheDocument();
  });
});
