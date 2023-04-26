enum Size {
    fine = -4,
    diminutive = -3,
    tiny = -2,
    small = -1,
    medium = 0,
    large = 1,
    huge = 2,
    gargantuan = 3,
    colossal = 4,
}

function sizeCombatMod(size: Size): number {
    switch (size) {
        case -4:
            return -8;
        case -3:
            return -4;
        case 3:
            return 4;
        case 4:
            return 8;
        default:
            return size;
    }
}

function parseSize(raw?: number): Size | undefined {
    for (const size of Object.values(Size)) {
        if (size === raw) {
            return size;
        }
    }
    return undefined;
}

export default Size;
export { sizeCombatMod, parseSize };
