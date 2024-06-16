import ParkingSession from "../parking_session.ts";

export interface ParkingSessionRepository {
  save(parkingSession: ParkingSession): void;
  find(key: string): ParkingSession | null;
}

export class ParkingSessionRepositoryImpl1 implements ParkingSessionRepository {
  private parkingSession: ParkingSession | null = null;
  private parkingSessionMap: Map<string, ParkingSession> = new Map();

  save(parkingSession: ParkingSession): void {
    this.parkingSessionMap.set(parkingSession.getKey(), parkingSession);

    this.parkingSession = parkingSession;
  }

  find(key: string): ParkingSession | null {
    return this.parkingSessionMap.get(key) || null;
  }
}