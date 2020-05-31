
export const countAverage = (a, b) => Math.floor((a + b) / 2);

export const changeFormat = value => {
    const number = parseFloat(value);
    const wholePart = Math.trunc(number);
    const fraction = Math.abs(number) - Math.abs(wholePart);
    const mins = Math.floor(fraction * 60);
    return `${wholePart}° ${mins}'`;
}