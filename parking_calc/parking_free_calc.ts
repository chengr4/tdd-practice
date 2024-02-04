import { getStartOfDay } from "./utils/date_tools.ts";

class ParkingFeeCalculator {
  calculate(start: Date, end: Date) {
    const diff = end.getTime() - start.getTime();
    const minutes = diff / 1000 / 60;
    if (minutes <= 15) {
      return 0;
    }
    // protect fee in one day
    if (start.getDate() === end.getDate()) {
      return Math.min(this.getRegularFee(minutes), 150);
    } else {

      let totalFee = 0;
      const todayStart = getStartOfDay(start);

      while (todayStart.getTime() < end.getTime()) {
        totalFee += 150;
        todayStart.setDate(todayStart.getDate() + 1);
      }


      return totalFee;
    }

  }

  private getRegularFee(minutes: number) {
    const period = Math.floor(minutes / 30);

    return (period + 1) * 30;
  }
}

export default ParkingFeeCalculator;