const { calculate } = require("../../src/math");

describe("Calculate final answer", () => {
  describe("given single number", () => {
    it("given single number return number", () => {
      const input = "0".split("").reverse();
      expect(calculate(input)).toBe("0");
    });

    it("given a single fraction return single fraction", () => {
      const input = "0_1/2".split("").reverse();
      expect(calculate(input)).toBe("1/2");
    });

    it("given a single non reduced fraction return single reduced fraction", () => {
      const input = "25/10".split("").reverse();
      expect(calculate(input)).toBe("2_1/2");
    });

    it("given a single whole number with non reduced fraction return single reduced number", () => {
      const input = "5_25/10".split("").reverse();
      expect(calculate(input)).toBe("7_1/2");
    });
  });

  describe("given two whole numbers", () => {
    it("given addition between two whole numbers return whole sum", () => {
      const input = "5 + 5".split("").reverse();
      expect(calculate(input)).toBe("10");
    });

    it("given addition between a negative and a whole number return whole sum", () => {
      const input = "5 + -5".split("").reverse();
      expect(calculate(input)).toBe("0");
    });

    it("given multiplication between two whole numbers return whole product", () => {
      const input = "5 * 5".split("").reverse();
      expect(calculate(input)).toBe("25");
    });

    it("given subtraction between two whole numbers return whole difference", () => {
      const input = "5 - 5".split("").reverse();
      expect(calculate(input)).toBe("0");
    });

    it("given division between two whole numbers return whole quotient", () => {
      const input = "5 / 5".split("").reverse();
      expect(calculate(input)).toBe("1");
    });
  });

  describe("given two whole fractions", () => {
    it("given addition between two fractions return sum", () => {
      const input = "1_1/2 + 1/2".split("").reverse();
      expect(calculate(input)).toBe("2");
    });

    it("given addition between a negative fraction and a positive fraction return difference", () => {
      const input = "0/1 + -3/10".split("").reverse();
      expect(calculate(input)).toBe("-3/10");
    });

    it("given multiplication between two fractions return product", () => {
      const input = "10/3 * 1_1/2".split("").reverse();
      expect(calculate(input)).toBe("5");
    });
    it("given subtraction between two fractions return difference", () => {
      const input = "0/1 - 3/10".split("").reverse();
      expect(calculate(input)).toBe("-3/10");
    });

    it("given division between two fractions return quotient", () => {
      const input = "1_1/2 / 3/10".split("").reverse();
      expect(calculate(input)).toBe("5");
    });
  });

  describe("given one fraction and one whole number", () => {
    it("given addition between one fraction and one whole number return the sum", () => {
      const input = "1 + 1/2".split("").reverse();
      expect(calculate(input)).toBe("1_1/2");
    });

    it("given multiplication between one fraction and one whole number return the product", () => {
      const input = "0 * 1_1/2".split("").reverse();
      expect(calculate(input)).toBe("0");
    });

    it("given subtraction between one fraction and one whole number return the difference", () => {
      const input = "5 - 3/10".split("").reverse();
      expect(calculate(input)).toBe("4_7/10");
    });

    it("given division between one fraction and one whole number return the quotient", () => {
      const input = "25 / 3/10".split("").reverse();
      expect(calculate(input)).toBe("83_1/3");
    });
  });

  describe("given expression with parens", () => {
    it("given parens expression with addition return correct value", () => {
      const input = " (10 + 2) + 5_1/2 + (4_1/2 + 1/2) ".split("").reverse();
      expect(calculate(input)).toBe("22_1/2");
    });

    it("given parens expression with multiplication return correct value", () => {
      const input = "3_1/2 *   (10 * 2/1) * 5/2 ".split("").reverse();
      expect(calculate(input)).toBe("175");
    });

    it("given parens expression with division return correct value", () => {
      const input = "3_1/2 / (10 / 2/1) / 5/2 ".split("").reverse();
      expect(calculate(input)).toBe("7/25");
    });

    it("given parens expression with subtraction return correct value", () => {
      const input = "3_1/2 - (10 - 2/1) - 5/2".split("").reverse();
      expect(calculate(input)).toBe("-7");
    });

    it("given parens expression with all operators return correct value", () => {
      const input = "1/2 - (10 - 2) * 2_3/2 / 5_4/2".split("").reverse();
      expect(calculate(input)).toBe("-3_1/2");
    });
  });
});
