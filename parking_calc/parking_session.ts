class ParkingSession {
  private start: Date;
  private end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  getStart() {
    return this.start;
  }

  setStart(start: Date) {
    this.start = start;
  }

  getEnd() {
    return this.end;
  }

  setEnd(end: Date) {
    this.end = end;
  }
}

export default ParkingSession;