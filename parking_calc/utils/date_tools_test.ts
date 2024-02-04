import { assertEquals } from "std/assert/assert_equals.ts";
import { getStartOfDay } from "./date_tools.ts";

Deno.test("getStartOfDay", () => {
  const date = new Date("2020-01-02T00:00:01Z");
  const actual = getStartOfDay(date);
  const expected = new Date("2020-01-02T00:00:00Z");
  assertEquals(actual, expected);
});