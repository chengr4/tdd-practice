import ParkingSession from "./parking_session.ts";

class ParkingFeeCalculator {
  calculate(parkingSession: ParkingSession) {
    const diff = parkingSession.getEnd().getTime() - parkingSession.getStart().getTime();
    const minutes = diff / 1000 / 60;
    if (minutes <= 15) {
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
}

export default ParkingFeeCalculator;