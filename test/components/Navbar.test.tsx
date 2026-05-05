import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "../helpers/renderWithIntl";
import Navbar from "@/components/Navbar";
import { useRouter, usePathname } from "next/navigation";

describe("Navbar", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/en");
    vi.mocked(useRouter).mockReturnValue({
      replace: vi.fn(),
      push: vi.fn(),
      back: vi.fn(),
    } as ReturnType<typeof useRouter>);
  });

  it("renders brand name", () => {
    renderWithIntl(<Navbar brandName="Studio Via Mentana" />, { locale: "en" });
    expect(screen.getAllByText("Studio Via Mentana").length).toBeGreaterThan(0);
  });

  it("renders nav links", () => {
    renderWithIntl(<Navbar brandName="Studio Via Mentana" />, { locale: "en" });
    expect(screen.getAllByText("360 Tour").length).toBeGreaterThan(0);
    expect(screen.getAllByText("The Studio").length).toBeGreaterThan(0);
  });

  it("renders language flag buttons", () => {
    renderWithIntl(<Navbar brandName="Studio Via Mentana" />, { locale: "en" });
    expect(screen.getByAltText("Italiano")).toBeInTheDocument();
    expect(screen.getByAltText("English")).toBeInTheDocument();
    expect(screen.getByAltText("Español")).toBeInTheDocument();
    expect(screen.getByAltText("Deutsch")).toBeInTheDocument();
  });

  it("calls router.replace when a language flag is clicked", async () => {
    const mockReplace = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      replace: mockReplace,
      push: vi.fn(),
      back: vi.fn(),
    } as ReturnType<typeof useRouter>);

    renderWithIntl(<Navbar brandName="Studio Via Mentana" />, { locale: "en" });
    const itButton = screen.getByTitle("Italiano");
    await userEvent.click(itButton);
    expect(mockReplace).toHaveBeenCalledWith("/it");
  });

  it("opens mobile menu when hamburger is clicked", async () => {
    renderWithIntl(<Navbar brandName="Studio Via Mentana" />, { locale: "en" });
    const hamburger = screen.getByLabelText("Menu");
    await userEvent.click(hamburger);
    const mobileLinks = screen.getAllByText("360 Tour");
    expect(mobileLinks.length).toBeGreaterThan(1);
  });
});
