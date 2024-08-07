import ParkingSession from "../parking_session.ts";
import ParkingSessionPersistenceObject from "../parking_session_po.ts";

export interface ParkingSessionRepository {
  save(parkingSession: ParkingSession): void;
  find(key: string): ParkingSession | null;
}

// Inteface Adapter
// DO: convert entity to a form that is suitable for the database and then save it
export class ParkingSessionRepositoryImpl1 implements ParkingSessionRepository {
  // mock database
  private parkingSessionMap: Map<string, ParkingSessionPersistenceObject> = new Map();

  save(parkingSession: ParkingSession): void {
    const parkingSessionPo: ParkingSessionPersistenceObject = ParkingSessionPersistenceObject.ofEntity(parkingSession);

    this.parkingSessionMap.set(parkingSession.getKey(), parkingSessionPo);
  }

  find(key: string): ParkingSession | null {
    const parkingSessionPo: ParkingSessionPersistenceObject | undefined = this.parkingSessionMap.get(key);
    if (!parkingSessionPo) {
      return null;
    }

    const parkingSession = ParkingSessionPersistenceObject.toEntity(parkingSessionPo);

    return parkingSession;
  }


}