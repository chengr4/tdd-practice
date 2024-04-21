import ParkingSession from "./parking_session.ts";

class ParkingFeeCalculator {
  calculate(parkingSession: ParkingSession) {
    const totalDuration = parkingSession.getTotalDuration();

    if (this.isLessFifteenMinutes(totalDuration)) {
      return 0;
    }

    const dailyDurationList: number[] = parkingSession.getDailyDurationList(parkingSession);

    let totalFee = 0;
    // the second loop is for charging behavior
    dailyDurationList.forEach((daily) => {
      totalFee += Math.min(this.getRegularFee(daily), 150);
    });

    return totalFee;
  }

  private getRegularFee(minutes: number) {
    const period = Math.floor(minutes / 30);

    return (period + 1) * 30;
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