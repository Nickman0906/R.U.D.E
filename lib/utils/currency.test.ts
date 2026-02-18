import { describe, expect, it } from "vitest";
import { formatCurrency } from "@/lib/utils/currency";

describe("formatCurrency", () => {
  it("formats as BRL", () => {
    expect(formatCurrency(1234.5)).toContain("1.234");
  });
});
