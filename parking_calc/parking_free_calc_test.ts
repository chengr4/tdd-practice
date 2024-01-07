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

Deno.test("over 15 min not free", () => {
  const sut = new ParkingFeeCalculator();

  const start = new Date("2020-01-01T00:00:00");
  const end = new Date("2020-01-01T00:15:00");

  const actual = sut.calculate(start, end);
  assertEquals(actual, 30);
});

Deno.test("over 30 min then pay 60", () => {
  const sut = new ParkingFeeCalculator();

  const start = new Date("2020-01-01T00:00:00");
  const end = new Date("2020-01-01T00:30:01");

  const actual = sut.calculate(start, end);
  assertEquals(actual, 60);
});

Deno.test("over 60 min then pay 90", () => {
  const sut = new ParkingFeeCalculator();

  const start = new Date("2020-01-01T00:00:00");
  const end = new Date("2020-01-01T01:00:00");

  const actual = sut.calculate(start, end);
  assertEquals(actual, 90);
});

Deno.test("over 150 min then pay 150", () => {
  const sut = new ParkingFeeCalculator();

  const start = new Date("2020-01-01T00:00:00");
  const end = new Date("2020-01-01T02:30:00");

  const actual = sut.calculate(start, end);
  assertEquals(actual, 150);
});




