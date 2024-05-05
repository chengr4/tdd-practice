import DailySession from "./daily_session.ts";
import ParkingSession from "./parking_session.ts";

class ParkingFeeCalculator {
  calculate(parkingSession: ParkingSession) {
    const totalDuration = parkingSession.getTotalDuration();

    if (this.isLessFifteenMinutes(totalDuration)) {
      return 0;
    }

    const dailySessionList: DailySession[] = parkingSession.getDailySessionList(parkingSession);

    let totalFee = 0;
    // the second loop is for charging behavior
    dailySessionList.forEach((dailySession: DailySession) => {
      totalFee += Math.min(this.getRegularFee(dailySession.getDuration(), dailySession.getToday()), 150);
    });

    return totalFee;
  }

  private getRegularFee(millisecond: number, today: Date) {
    const minutes = millisecond / 1000 / 60;
    const period = Math.floor(minutes / 30);


    let unitPrice = 30;
    if (today.getDay() === 6) {
      unitPrice = 50;
    }

    return (period + 1) * unitPrice;
  }

  private isLessFifteenMinutes(totalDuration: number): boolean {
    const minutes = totalDuration / 1000 / 60;
    if (minutes <= 15) {
      return true;
    }

    return false;
  }
}

export default ParkingFeeCalculator;