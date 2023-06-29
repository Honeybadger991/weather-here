
export const weekDayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const monthsNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export const getTxtDate = (unixSec, timezoneShift) => {
    const date = new Date((unixSec + timezoneShift) * 1000);// * 1000 - convert to milliseconds
    const weekDayName = weekDayNames[date.getUTCDay()];
    const monthsName = monthsNames[date.getUTCMonth()];

    return `${weekDayName}, ${date.getUTCDate()}, ${monthsName}`;
};

export const getTime = (unixSec, timezoneShift) => {
    const date = new Date((unixSec + timezoneShift) * 1000);
    const hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    const period = hours > 12 ? 'P.M.' : 'A.M.';
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours % 12 || 12}:${minutes} ${period}`;
}

export const getForecastHours = (unixSec, timezoneShift) => {
    const date = new Date((unixSec + timezoneShift) * 1000);
    const hours = date.getUTCHours();
    const period = hours > 12 ? 'P.M.' : 'A.M.';

    return `${hours % 12 || 12} ${period}`;
}


export const windSpeedInKph = mps => (mps * 3.6);