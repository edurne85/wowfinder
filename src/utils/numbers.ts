function sum(...args: number[]): number {
    return args.reduce((a, b) => a + b, 0);
}

const factor = 1000;
function fThousands(value: number, sep = ' '): string {
    if (value < 0) {
        return '-' + fThousands(-value, sep);
    }
    const blocks = [];
    do {
        blocks.push(value % factor);
        value = Math.floor(value / factor);
    } while (value > 0);
    const res = blocks
        .reverse()
        .map(num => num.toString().padStart(3, '0'))
        .join(sep)
        .replace(/^0+/, '');
    return res || '0';
}

function toRoman(val: number): string {
    if (val <= -1) {
        return '-' + toRoman(-val);
    }
    if (val < 1) {
        return '0';
    }
    const roman = [];
    while (val >= 1) {
        if (val >= 1000) {
            roman.push('M');
            val -= 1000;
        } else if (val >= 900) {
            roman.push('CM');
            val -= 900;
        } else if (val >= 500) {
            roman.push('D');
            val -= 500;
        } else if (val >= 400) {
            roman.push('CD');
            val -= 400;
        } else if (val >= 100) {
            roman.push('C');
            val -= 100;
        } else if (val >= 90) {
            roman.push('XC');
            val -= 90;
        } else if (val >= 50) {
            roman.push('L');
            val -= 50;
        } else if (val >= 40) {
            roman.push('XL');
            val -= 40;
        } else if (val >= 10) {
            roman.push('X');
            val -= 10;
        } else if (val >= 9) {
            roman.push('IX');
            val -= 9;
        } else if (val >= 5) {
            roman.push('V');
            val -= 5;
        } else if (val >= 4) {
            roman.push('IV');
            val -= 4;
        } else if (val >= 1) {
            roman.push('I');
            val -= 1;
        }
    }
    return roman.join('');
}

export { sum, fThousands, toRoman };
