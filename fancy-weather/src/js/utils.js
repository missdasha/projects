
export const countAverage = (a, b) => Math.round((a + b) / 2);

export const changeFormat = value => {
    const wholePart = Math.trunc(value);
    const fraction = Math.abs(value) - Math.abs(wholePart);
    const mins = Math.floor(fraction * 60);
    return `${wholePart}° ${mins}'`;
}