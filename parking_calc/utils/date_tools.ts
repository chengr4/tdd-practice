export function getStartOfDay(date: Date) {    
    date.setUTCHours(0, 0, 0, 0);
    return date;
}