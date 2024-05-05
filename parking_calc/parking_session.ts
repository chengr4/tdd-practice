import DailySession from "./daily_session.ts";
import { getStartOfDay } from "./utils/date_tools.ts";

class ParkingSession {
  private readonly start: Date;
  private readonly end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  getStart() {
    return this.start;
  }

  getEnd() {
    return this.end;
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