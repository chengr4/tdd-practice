class ParkingFeeCalculator {
    calculate(start: Date, end: Date) {
        const diff = end.getTime() - start.getTime();
        const minutes = diff / 1000 / 60;
        if (minutes < 15) {
            return 0;
        }

        return this.getRegularFee(minutes);

    }

    private getRegularFee(minutes: number) {
        const period = Math.floor(minutes / 30);

        return (period + 1) * 30;
    }
}

export default ParkingFeeCalculator;