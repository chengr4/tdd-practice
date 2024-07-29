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

}

export default ParkingSessionPersistenceObject;