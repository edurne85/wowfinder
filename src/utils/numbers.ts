
function sum(...args: number[]): number {
    return args.reduce((a, b) => a + b, 0);
}

const factor = 1000;
function fThousands (value: number, sep = ' '): string {
    if (value < 0) {
        return '-' + fThousands(-value, sep);
    }
    const blocks = [];
    do {
        blocks.push(value % factor);
        value = Math.floor(value / factor);
    } while (value > 0);
    return blocks.reverse().map(num => num.toString().padStart(3, '0')).join(sep).replace(/^0+/, '');
}

export {
    sum,
    fThousands,
};