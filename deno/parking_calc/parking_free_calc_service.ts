import DailySession from "./daily_session.ts";
import ParkingSession from "./parking_session.ts";
import { ParkingSessionRepository } from "./repositories/parking_session_repos.ts";
import { isHoliday } from "./utils/date_tools.ts";

class ParkingFeeCalculatorService {
  
  private parkingSessionRepository: ParkingSessionRepository;

  constructor(parkingSessionRepository: ParkingSessionRepository) {
    this.parkingSessionRepository = parkingSessionRepository;
  }

  calculate(key: string) {
    const parkingSession = this.parkingSessionRepository.find(key);
    if (parkingSession === null) {
      return 0;
    }
    const totalDuration = parkingSession.getTotalDuration();

    if (this.isLessFifteenMinutes(totalDuration)) {
      return 0;
    }

    const dailySessionList: DailySession[] = parkingSession.getDailySessionList(parkingSession);
    let totalFee = 0;

    // charging total fee
    dailySessionList.forEach((dailySession: DailySession) => {
      const dailyLimit = isHoliday(dailySession.getToday()) ? 2400 : 150;
      totalFee += Math.min(this.getRegularFee(dailySession.getDuration(), dailySession.getToday()), dailyLimit);
    });

    return totalFee;
  }

  private getRegularFee(millisecond: number, today: Date) {
    const minutes = millisecond / 1000 / 60;
    const period = Math.floor(minutes / 30);


    let unitPrice = 30;
    if (isHoliday(today)) {
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

export default ParkingFeeCalculatorService;