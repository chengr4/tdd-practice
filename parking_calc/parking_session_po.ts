import ParkingSession from "./parking_session.ts";

class ParkingSessionPersistenceObject {
  private key!: string;
  private start!: number;
  private end!: number;

  getKey(): string {
    return this.key;
  }

  setKey(key: string): void {
    this.key = key;
  }

  getStart(): number {
    return this.start;
  }

  setStart(start: number): void {
    this.start = start;
  }

  getEnd(): number {
    return this.end;
  }

  setEnd(end: number): void {
    this.end = end;
  }

  // factory method
  static ofEntity(parkingSession: ParkingSession) {
    const parkingSessionPo: ParkingSessionPersistenceObject = new ParkingSessionPersistenceObject();
    parkingSessionPo.setKey(parkingSession.getKey());
    parkingSessionPo.setStart(parkingSession.getStart().getTime());
    parkingSessionPo.setEnd(parkingSession.getEnd().getTime());
    return parkingSessionPo;
  }

  // factory method
  static toEntity(parkingSessionPo: ParkingSessionPersistenceObject) {
    return new ParkingSession(
      parkingSessionPo.getKey(),
      new Date(parkingSessionPo.getStart()),
      new Date(parkingSessionPo.getEnd())
    );
  }
}

export default ParkingSessionPersistenceObject;