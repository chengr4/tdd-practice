import { getStartOfDay } from "./utils/date_tools.ts";
import ParkingSession from "./parking_session.ts";

class ParkingFeeCalculator {
  calculate(parkingSession: ParkingSession) {
    const diff = parkingSession.getEnd().getTime() - parkingSession.getStart().getTime();
    const minutes = diff / 1000 / 60;
    if (minutes <= 15) {
      return 0;
    }

    const dailyDurationList: number[] = this.getDailyDurationList(parkingSession);

    let totalFee = 0;
    // the second loop is for charging behavior
    dailyDurationList.forEach((daily) => {
      totalFee += Math.min(this.getRegularFee(daily), 150);
    });

    return totalFee;
  }

  private getDailyDurationList(parkingSession: ParkingSession) {
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

  private getRegularFee(minutes: number) {
    const period = Math.floor(minutes / 30);

    return (period + 1) * 30;
  }
}

export default ParkingFeeCalculator;