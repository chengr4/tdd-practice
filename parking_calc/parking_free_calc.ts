import { getStartOfDay } from "./utils/date_tools.ts";

class ParkingFeeCalculator {
  calculate(start: Date, end: Date) {
    const diff = end.getTime() - start.getTime();
    const minutes = diff / 1000 / 60;
    if (minutes <= 15) {
      return 0;
    }

    const dailyDurationList: number[] = this.getDailyDurationList(start, end);

    let totalFee = 0;
    // the second loop is for charging behavior
    dailyDurationList.forEach((daily) => {
      totalFee += Math.min(this.getRegularFee(daily), 150);
    });

    return totalFee;
  }

  private getDailyDurationList(start: Date, end: Date) {
    const dailyDurationList: number[] = [];
    let todayStartTime: number = getStartOfDay(start).getTime();

    // The first loop is now only for parking behavior
    while (todayStartTime < end.getTime()) {
      const tomorrowStartTime: number = todayStartTime + 24 * 60 * 60 * 1000;
      const currentStart = start.getTime() > todayStartTime ?
        start.getTime() : todayStartTime;
      const currentEnd = end.getTime() < tomorrowStartTime ?
        end.getTime() : tomorrowStartTime;
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