import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "../helpers/renderWithIntl";
import DescriptionSection from "@/components/DescriptionSection";
import { fullProperty, minimalProperty } from "../fixtures/property";

describe("DescriptionSection", () => {
  it("returns null when property.description is undefined", () => {
    const { container } = renderWithIntl(
      <DescriptionSection property={minimalProperty} locale="en" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders title in the given locale", () => {
    renderWithIntl(<DescriptionSection property={fullProperty} locale="en" />);
    expect(screen.getByText("The Studio")).toBeInTheDocument();
  });

  it("renders title in Italian when locale is 'it'", () => {
    renderWithIntl(<DescriptionSection property={fullProperty} locale="it" />);
    expect(screen.getByText("Lo Studio")).toBeInTheDocument();
  });

  it("renders body text", () => {
    renderWithIntl(<DescriptionSection property={fullProperty} locale="en" />);
    expect(screen.getByText("Body EN")).toBeInTheDocument();
  });

  it("renders amenity rows from amenityKeys", () => {
    renderWithIntl(<DescriptionSection property={fullProperty} locale="en" />);
    expect(screen.getByText("Refrigerator")).toBeInTheDocument();
    expect(screen.getByText("WiFi")).toBeInTheDocument();
  });
});
