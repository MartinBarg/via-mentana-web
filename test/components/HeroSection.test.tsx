import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "../helpers/renderWithIntl";
import HeroSection from "@/components/HeroSection";
import { fullProperty, minimalProperty } from "../fixtures/property";

describe("HeroSection — single property", () => {
  it("renders hero title in given locale", () => {
    renderWithIntl(<HeroSection properties={[fullProperty]} locale="en" />);
    expect(screen.getByText("Studio in Rome")).toBeInTheDocument();
  });

  it("renders hero subtitle", () => {
    renderWithIntl(<HeroSection properties={[fullProperty]} locale="en" />);
    expect(screen.getByText("Subtitle EN")).toBeInTheDocument();
  });

  it("renders Kuula iframe when kuulaEmbedUrl is present", () => {
    renderWithIntl(<HeroSection properties={[fullProperty]} locale="en" />);
    const iframes = document.querySelectorAll("iframe");
    const kuulaIframe = Array.from(iframes).find((f) => f.src.includes("kuula.co"));
    expect(kuulaIframe).toBeDefined();
  });

  it("renders fallback background when kuulaEmbedUrl is absent", () => {
    renderWithIntl(<HeroSection properties={[minimalProperty]} locale="en" />);
    const iframes = document.querySelectorAll("iframe");
    expect(iframes.length).toBe(0);
  });

  it("renders Airbnb CTA link when airbnbUrl is present", () => {
    renderWithIntl(<HeroSection properties={[fullProperty]} locale="en" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", fullProperty.airbnbUrl);
  });

  it("renders title in Italian when locale is 'it'", () => {
    renderWithIntl(<HeroSection properties={[fullProperty]} locale="it" />);
    expect(screen.getByText("Studio a Roma")).toBeInTheDocument();
  });
});

describe("HeroSection — multiple properties", () => {
  const secondProperty = {
    ...fullProperty,
    id: "second-property",
    hero: {
      title: { it: "Secondo IT", en: "Second EN", es: "Segundo ES", de: "Zweite DE" },
      subtitle: { it: "Sub IT", en: "Sub EN", es: "Sub ES", de: "Sub DE" },
    },
  };

  it("renders multiple Kuula iframes in grid layout", () => {
    renderWithIntl(
      <HeroSection properties={[fullProperty, secondProperty]} locale="en" />
    );
    const iframes = document.querySelectorAll("iframe");
    expect(iframes.length).toBe(2);
  });

  it("shows primary property title in the header", () => {
    renderWithIntl(
      <HeroSection properties={[fullProperty, secondProperty]} locale="en" />
    );
    expect(screen.getByText("Studio in Rome")).toBeInTheDocument();
  });
});
