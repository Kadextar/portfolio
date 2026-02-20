import React from "react";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../../messages/en.json";
import { Footer } from "@/components/Footer";

describe("Footer smoke", () => {
  it("renders footer with copyright and links", () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <Footer />
      </NextIntlClientProvider>
    );
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText(/Azamat Satullaev/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
  });
});
