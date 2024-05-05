export function getStartOfDay(date: Date): Date {
    const startOfDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    return startOfDay;
}

const nationalHolidays = new Set<string>([
    new Date("2024-01-01").toISOString(),
]);

export function isHoliday(today: Date): boolean {    
    return (today.getDay() === 6 || today.getDay() === 0) ||
        nationalHolidays.has(getStartOfDay(today).toISOString());
}