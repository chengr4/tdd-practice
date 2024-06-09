import ParkingSession from "../parking_session.ts";

export interface ParkingSessionRepository {
  save(parkingSession: ParkingSession): void;
  find(): ParkingSession;
}

export class ParkingSessionRepositoryImpl1 implements ParkingSessionRepository {
  private parkingSession: ParkingSession | null = null;

  save(parkingSession: ParkingSession): void {
    this.parkingSession = parkingSession;
  }

  find(): ParkingSession {
    return this.parkingSession!;
  }
}