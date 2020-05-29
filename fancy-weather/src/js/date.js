export const getSeason = timeZone => {
    console.log(new Date().toLocaleString('en-GB', {timeZone, weekday: 'short',  day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit'}));
    const date = new Date().toLocaleString('en-GB', {timeZone, weekday: 'short',  day: 'numeric' ,month: 'long' ,hour: '2-digit', minute: '2-digit', second: '2-digit'});
    const month = new Date(date).getMonth() + 1;
    console.log(month);
    if (month <= 1 || month === 12) {
        return 'winter'; // replace with constant
    }
    if (month >= 3 || month <= 5) {
        return 'spring';
    }
    if (month >= 6 || month <= 8) {
        return 'summer';
    }
    return 'autumn';
}

export const getDayTime = timeZone => {
    const date = new Date().toLocaleString('en-GB', {timeZone, weekday: 'short',  day: 'numeric' ,month: 'long' ,hour: '2-digit', minute: '2-digit', second: '2-digit'});
    console.log(Date.parse(date));
    const hours = new Date(date).getHours();
    console.log(hours);
    if (hours < 5) {
        return 'night';
    }
    if (hours < 12) {
        return 'morning'; // replace with constant
    }
    if (hours < 18) {
        return 'afternoon';
    }
    return 'evening';
}
