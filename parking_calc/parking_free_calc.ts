import { getStartOfDay } from "./utils/date_tools.ts";

class ParkingFeeCalculator {
  calculate(start: Date, end: Date) {
    const diff = end.getTime() - start.getTime();
    const minutes = diff / 1000 / 60;
    if (minutes <= 15) {
      return 0;
    }

    // fee in one day
    if (start.getDate() === end.getDate()) {
      return Math.min(this.getRegularFee(minutes), 150);
    }

    // more than one day
    let totalFee = 0;
    let todayStart: Date = getStartOfDay(start);

    while (todayStart.getTime() < end.getTime()) {
      const currentStart = end.getTime() < todayStart.getTime() + 24 * 60 * 60 * 1000 ?
        end.getTime() : todayStart.getTime() + 24 * 60 * 60 * 1000;
      const currEnd = end.getTime() < todayStart.getTime() + 24 * 60 * 60 * 1000 ?
        todayStart.getTime() : start.getTime();
      const sessionMinutes = (currentStart - currEnd) / 1000 / 60;

      totalFee += Math.min(this.getRegularFee(sessionMinutes), 150);
      
      todayStart = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
    }

    return totalFee;
  }

  private getRegularFee(minutes: number) {
    const period = Math.floor(minutes / 30);

    return (period + 1) * 30;
  }
}

export default ParkingFeeCalculator;