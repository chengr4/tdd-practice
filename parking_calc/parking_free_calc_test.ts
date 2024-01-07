import ParkingFeeCalculator from "./parking_free_calc.ts";
import { assertEquals } from "std/assert/assert_equals.ts";

Deno.test("15 mins free", () => {
  const sut = new ParkingFeeCalculator();

  // use local datetime
  const start = new Date("2020-01-01T00:00:00");
  const end = new Date("2020-01-01T00:14:59");

  const actual = sut.calculate(start, end);
  assertEquals(actual, 0);
});
