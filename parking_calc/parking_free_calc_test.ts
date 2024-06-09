import ParkingSession from "./parking_session.ts";
import ParkingFeeCalculator from "./parking_free_calc_service.ts";
import { assertEquals } from "std/assert/assert_equals.ts";
import { ParkingSessionRepositoryImpl1 } from "./repositories/parking_session_repos.ts";

let actual: number;
const parkingSessionRepositoryTestUnit = new ParkingSessionRepositoryImpl1();

const sut = new ParkingFeeCalculator(parkingSessionRepositoryTestUnit);

Deno.test("15 mins free", () => {
  startParkingAt("2020-01-02T00:00:00Z");
  endParkingAt("2020-01-02T00:15:00Z");
  calculate();
  shouldPay(0);
});

Deno.test("over 15 min on weekday", () => {
  // 15 - 30 min
  startParkingAt("2020-01-02T00:00:00Z");
  endParkingAt("2020-01-02T00:15:01Z");
  calculate();
  shouldPay(30);

  // 30 - 60 min
  startParkingAt("2020-01-02T00:01:00Z");
  endParkingAt("2020-01-02T00:31:01Z");
  calculate();
  shouldPay(60);

  // 60 - 90 min
  startParkingAt("2020-01-02T00:00:00Z");
  endParkingAt("2020-01-02T01:00:01Z");
  calculate();
  shouldPay(90);

  // max 150 NTD
  startParkingAt("2020-01-02T00:00:00Z");
  endParkingAt("2020-01-02T02:30:01Z");
  calculate();
  shouldPay(150);
});

Deno.test("over 15 min not free on Saturday", () => {
  // pay 50 NTD per 30 min
  startParkingAt("2024-01-06T00:00:00Z");
  endParkingAt("2024-01-06T00:15:01Z");
  calculate();
  shouldPay(50);

  // max 2400;
  startParkingAt("2024-01-06T00:00:00Z");
  endParkingAt("2024-01-07T00:00:00Z");
  calculate();
  shouldPay(2400);
});

Deno.test("over 15 min not free on Sunday", () => {
  // pay 50 NTD per 30 min
  startParkingAt("2024-01-07T00:00:00Z");
  endParkingAt("2024-01-07T00:15:01Z");
  calculate();
  shouldPay(50);
});

Deno.test("over 15 min not free on national holiday", () => {
  // pay 50 NTD per 30 min
  startParkingAt("2024-01-01T00:00:00Z");
  endParkingAt("2024-01-01T00:15:01Z");
  calculate();
  shouldPay(50);
});

Deno.test("two whole days", () => {
  startParkingAt("2020-01-02T00:00:00Z");
  endParkingAt("2020-01-04T00:00:00Z");
  calculate();
  shouldPay(150 + 150);
});

Deno.test("day1 10 min, day2 whole day", () => {
  startParkingAt("2020-01-02T23:50:00Z");
  endParkingAt("2020-01-04T00:00:00Z");
  calculate();
  shouldPay(30 + 150);
});

Deno.test("day1 whole day, day2 10 min", () => {
  startParkingAt("2020-01-02T00:00:00Z");
  endParkingAt("2020-01-03T00:10:00Z");
  calculate();
  shouldPay(150 + 30);
});

function shouldPay(expected: number) {
  assertEquals(actual, expected);
}

function startParkingAt(startText: string) {
  parkingSessionRepositoryTestUnit.save(new ParkingSession(new Date(startText), new Date(startText)));
}

function endParkingAt(endText: string) {
  const parkingSession = parkingSessionRepositoryTestUnit.find();
  parkingSession.setEnd(new Date(endText));
  parkingSessionRepositoryTestUnit.save(parkingSession);
}

function calculate() {
  actual = sut.calculate();
}
