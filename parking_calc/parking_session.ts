import DailySession from "./daily_session.ts";
import { getStartOfDay } from "./utils/date_tools.ts";

class ParkingSession {
  // DDD: extract factroy method for start
  // it hides "end" field
  static start(key: string, startText: string) {
    return new ParkingSession(key, new Date(startText), new Date(startText));
  }

  // DDD: extract factroy method for end
  over(endText: string) {
    this.setEnd(new Date(endText));
  }

  private key: string;
  private start: Date;
  private end: Date;

  constructor(key: string, start: Date, end: Date) {
    this.key = key;
    this.start = start;
    this.end = end;
  }

  getStart() {
    return this.start;
  }

  getEnd() {
    return this.end;
  }

  getKey() {
    return this.key;
  }

  setStart(start: Date): void {
    this.start = start;
  }

  setEnd(end: Date): void {
    this.end = end;
  }

  getTotalDuration(): number {
    return this.end.getTime() - this.start.getTime();
  }

  getDailySessionList(parkingSession: ParkingSession): DailySession[] {
    const dailySessionList: DailySession[] = [];
    const today: Date = getStartOfDay(parkingSession.getStart());
    let todayStartTime: number = today.getTime();

    while (todayStartTime < parkingSession.getEnd().getTime()) {
      const tomorrowStartTime: number = todayStartTime + 24 * 60 * 60 * 1000;
      const currentStart = parkingSession.getStart().getTime() > todayStartTime ?
        parkingSession.getStart().getTime() : todayStartTime;
      const currentEnd = parkingSession.getEnd().getTime() < tomorrowStartTime ?
        parkingSession.getEnd().getTime() : tomorrowStartTime;
      // const sessionDuration = (currentEnd - currentStart) / 1000 / 60;
      const sessionDuration = currentEnd - currentStart;
      // dailyDurationList.push(sessionMinutes);
      dailySessionList.push(new DailySession(
        sessionDuration,
        today
      ));

      todayStartTime = tomorrowStartTime;
    }
    return dailySessionList;
  }
}

export default ParkingSession;