import { getStartOfDay } from "./utils/date_tools.ts";

class ParkingSession {
  private start: Date;
  private end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  getStart() {
    return this.start;
  }

  setStart(start: Date) {
    this.start = start;
  }

  getEnd() {
    return this.end;
  }

  setEnd(end: Date) {
    this.end = end;
  }

   getDailyDurationList(parkingSession: ParkingSession) {
    const dailyDurationList: number[] = [];
    let todayStartTime: number = getStartOfDay(parkingSession.getStart()).getTime();

    // The first loop is now only for parking behavior
    while (todayStartTime < parkingSession.getEnd().getTime()) {
      const tomorrowStartTime: number = todayStartTime + 24 * 60 * 60 * 1000;
      const currentStart = parkingSession.getStart().getTime() > todayStartTime ?
        parkingSession.getStart().getTime() : todayStartTime;
      const currentEnd = parkingSession.getEnd().getTime() < tomorrowStartTime ?
        parkingSession.getEnd().getTime() : tomorrowStartTime;
      const sessionMinutes = (currentEnd - currentStart) / 1000 / 60;
      dailyDurationList.push(sessionMinutes);

      todayStartTime = tomorrowStartTime;
    }
    return dailyDurationList;
  }
}

export default ParkingSession;