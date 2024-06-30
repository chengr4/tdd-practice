import ParkingSession from "./parking_session.ts";
import ParkingFeeCalculator from "./parking_free_calc_service.ts";
import { assertEquals } from "std/assert/assert_equals.ts";
import { ParkingSessionRepositoryImpl1 } from "./repositories/parking_session_repos.ts";

let actual: number;
const parkingSessionRepositoryTestUnit = new ParkingSessionRepositoryImpl1();

const sut = new ParkingFeeCalculator(parkingSessionRepositoryTestUnit);

Deno.test("15 mins free", () => {
  startParkingAt("ABC-1234", "2020-01-02T00:00:00Z");
  endParkingAt("ABC-1234", "2020-01-02T00:15:00Z");
  calculate("ABC-1234");
  shouldPay(0);
});

Deno.test("over 15 min on weekday", () => {
  // 15 - 30 min
  startParkingAt("ABC-1234", "2020-01-02T00:00:00Z");
  endParkingAt("ABC-1234", "2020-01-02T00:15:01Z");
  calculate("ABC-1234");
  shouldPay(30);

  // 30 - 60 min
  startParkingAt("ABC-1234", "2020-01-02T00:01:00Z");
  endParkingAt("ABC-1234", "2020-01-02T00:31:01Z");
  calculate("ABC-1234");
  shouldPay(60);

  // 60 - 90 min
  startParkingAt("ABC-1234", "2020-01-02T00:00:00Z");
  endParkingAt("ABC-1234", "2020-01-02T01:00:01Z");
  calculate("ABC-1234");
  shouldPay(90);

  // max 150 NTD
  startParkingAt("ABC-1234", "2020-01-02T00:00:00Z");
  endParkingAt("ABC-1234", "2020-01-02T02:30:01Z");
  calculate("ABC-1234");
  shouldPay(150);
});

Deno.test("over 15 min not free on Saturday", () => {
  // pay 50 NTD per 30 min
  startParkingAt("ABC-1234", "2024-01-06T00:00:00Z");
  endParkingAt("ABC-1234", "2024-01-06T00:15:01Z");
  calculate("ABC-1234");
  shouldPay(50);

  // max 2400;
  startParkingAt("ABC-1234", "2024-01-06T00:00:00Z");
  endParkingAt("ABC-1234", "2024-01-07T00:00:00Z");
  calculate("ABC-1234");
  shouldPay(2400);
});

Deno.test("over 15 min not free on Sunday", () => {
  // pay 50 NTD per 30 min
  startParkingAt("ABC-1234", "2024-01-07T00:00:00Z");
  endParkingAt("ABC-1234", "2024-01-07T00:15:01Z");
  calculate("ABC-1234");
  shouldPay(50);
});

Deno.test("over 15 min not free on national holiday", () => {
  // pay 50 NTD per 30 min
  startParkingAt("ABC-1234", "2024-01-01T00:00:00Z");
  endParkingAt("ABC-1234", "2024-01-01T00:15:01Z");
  calculate("ABC-1234");
  shouldPay(50);
});

Deno.test("two whole days", () => {
  startParkingAt("ABC-1234", "2020-01-02T00:00:00Z");
  endParkingAt("ABC-1234", "2020-01-04T00:00:00Z");
  calculate("ABC-1234");
  shouldPay(150 + 150);
});

Deno.test("day1 10 min, day2 whole day", () => {
  startParkingAt("ABC-1234", "2020-01-02T23:50:00Z");
  endParkingAt("ABC-1234", "2020-01-04T00:00:00Z");
  calculate("ABC-1234");
  shouldPay(30 + 150);
});

Deno.test("day1 whole day, day2 10 min", () => {
  startParkingAt("ABC-1234", "2020-01-02T00:00:00Z");
  endParkingAt("ABC-1234", "2020-01-03T00:10:00Z");
  calculate("ABC-1234");
  shouldPay(150 + 30);
});

Deno.test("another car", () => {
  startParkingAt("ABC-1234", "2020-01-02T00:00:00Z");
  endParkingAt("ABC-1234", "2020-01-02T00:30:00Z");
  calculate("NOT-MY-CAR");
  shouldPay(0);
});

function shouldPay(expected: number) {
  assertEquals(actual, expected);
}

function startParkingAt(key: string, startText: string) {
const parkingSession = ParkingSession.start(key, startText);
  parkingSessionRepositoryTestUnit.save(parkingSession);
}

function endParkingAt(key: string, endText: string) {
  const parkingSession = parkingSessionRepositoryTestUnit.find(key)!;
  parkingSession.setEnd(new Date(endText));
  parkingSessionRepositoryTestUnit.save(parkingSession);
}

function calculate(key: string) {
  actual = sut.calculate(key);
}
