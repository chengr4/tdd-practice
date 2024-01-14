import ParkingFeeCalculator from "./parking_free_calc.ts";
import { assertEquals } from "std/assert/assert_equals.ts";
import { beforeAll } from "std/testing/bdd.ts";

let sut: ParkingFeeCalculator;
let start: Date;
let end: Date;
let actual: number;

beforeAll(() => {
  sut = new ParkingFeeCalculator();
});

Deno.test("15 mins free", () => {
  newFunction("2020-01-01T00:00:00", "2020-01-01T00:14:59", 0);
});

Deno.test("over 15 min not free", () => {
  newFunction("2020-01-01T00:00:00", "2020-01-01T00:15:00", 30);
});

Deno.test("over 30 min then pay 60", () => {
  newFunction("2020-01-01T00:00:00", "2020-01-01T00:30:01", 60);
});

Deno.test("over 60 min then pay 90", () => {
  newFunction("2020-01-01T00:00:00", "2020-01-01T01:00:00", 90);
});

Deno.test("over 150 min then pay 150", () => {
  newFunction("2020-01-01T00:00:00", "2020-01-01T02:30:00", 150);
});

function newFunction(startText: string, endText: string, expected: number) {

  // use local datetime
  startParkingAt(startText);
  endParkingAt(endText);
  calculate();
  
  shouldPay(expected);
}


function shouldPay(expected: number) {
  assertEquals(actual, expected);
}

function endParkingAt(endText: string) {
  end = new Date(endText);
}

function startParkingAt(startText: string) {
  start = new Date(startText);
}

function calculate() {
  actual = sut.calculate(start, end);
}
