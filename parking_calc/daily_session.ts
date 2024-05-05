class DailySession {
  private readonly duration: number;
  private readonly today: Date;

  constructor(duration: number, today: Date) {
    this.duration = duration;
    this.today = today;
  }

  getDuration(): number {
    return this.duration;
  }

  getToday(): Date {
    return this.today;
  }
}

export default DailySession;