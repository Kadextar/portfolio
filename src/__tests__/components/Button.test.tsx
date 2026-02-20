import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders with default variant and size", () => {
    render(<Button>Submit</Button>);
    const btn = screen.getByRole("button", { name: /submit/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("rounded-xl");
  });
});
