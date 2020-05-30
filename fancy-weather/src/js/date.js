export const getDate = () => new Date().toLocaleString('en-GB', {timeZone: localStorage.getItem('timezone'), 
    weekday: 'short',  day: 'numeric' ,month: 'long' ,hour: '2-digit', minute: '2-digit', second: '2-digit'});

export const getSeason = () => {
    const month = new Date(getDate()).getMonth() + 1;
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

export const getDayTime = () => {
    const hours = new Date(getDate()).getHours();
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
