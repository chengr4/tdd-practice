export function getStartOfDay(date: Date) {    
    const startOfDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    return startOfDay;
}