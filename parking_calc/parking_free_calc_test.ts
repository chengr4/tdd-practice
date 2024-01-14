import ParkingFeeCalculator from "./parking_free_calc.ts";
import { assertEquals } from "std/assert/assert_equals.ts";

let start: Date;
let end: Date;
let actual: number;

const sut = new ParkingFeeCalculator();

Deno.test("15 mins free", () => {
  startParkingAt("2020-01-02T00:00:00");
  endParkingAt("2020-01-02T00:14:59");
  calculate();
  shouldPay(0);
});

Deno.test("over 15 min not free", () => {
  startParkingAt("2020-01-02T00:00:00");
  endParkingAt("2020-01-02T00:15:00");
  calculate();
  shouldPay(30);
});

Deno.test("over 30 min then pay 60", () => {
  startParkingAt("2020-01-02T00:00:00");
  endParkingAt("2020-01-02T00:30:01");
  calculate();
  shouldPay(60);
});

Deno.test("over 60 min then pay 90", () => {
  startParkingAt("2020-01-02T00:00:00");
  endParkingAt("2020-01-02T01:00:00");
  calculate();
  shouldPay(90);
});

Deno.test("over 150 min then pay 150", () => {
  startParkingAt("2020-01-02T00:00:00");
  endParkingAt("2020-01-02T02:30:00");
  calculate();
  shouldPay(150);
});

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
