import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "../../apps/web/messages/en.json";

interface Options extends Omit<RenderOptions, "wrapper"> {
  locale?: string;
}

export function renderWithIntl(ui: React.ReactElement, { locale = "en", ...options }: Options = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={enMessages}>
        {children}
      </NextIntlClientProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}
