import { isEven } from "./math";

describe("Math test suite - isEven()", () => {
  it("should return true for a given even number", () => {
    const result = isEven(2);
    expect(result).toBeTruthy();
  });
  it("should return false for a given odd number", () => {
    const result = isEven(1);
    expect(result).toBeFalsy();
  });
});
