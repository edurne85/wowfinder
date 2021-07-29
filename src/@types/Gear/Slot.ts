enum GearSlot {
    mhand = 'mhand',
    ohand = 'ohand',
    head = 'head',
    torso = 'torso',
    back = 'back',
    ear = 'ear',
    neck = 'neck',
    shoulders = 'shoulders', // Pair
    hands = 'hands', // Pair
    wrists = 'wrists', // Pair
    waist = 'waist',
    legs = 'legs', // Pair
    feet = 'feet', // Pair
    ring = 'ring', // Each
}

type Shape = {slot: GearSlot, qtty: number}[];

function compactShape(shape: Shape): Shape {
    const result: Shape = [];
    for (const slot of Object.keys(GearSlot) as GearSlot[]) {
        const qtty = shape
            .filter(entry => entry.slot === slot)
            .map(entry => entry.qtty)
            .reduce((a, b) => a + b, 0);
        if (qtty > 0) {
            result.push({slot, qtty});
        }
    }
    return result;
}

const upperLimbs = (pairs = 1, fingersPerHand = 5): Shape => [
    { slot: GearSlot.shoulders, qtty: pairs },
    { slot: GearSlot.hands, qtty: pairs },
    { slot: GearSlot.wrists, qtty: pairs },
    { slot: GearSlot.mhand, qtty: pairs },
    { slot: GearSlot.ohand, qtty: pairs },
    { slot: GearSlot.ring, qtty: 2 * pairs * fingersPerHand },
];

const lowerLimbs = (pairs = 1): Shape => [
    { slot: GearSlot.legs, qtty: pairs },
    { slot: GearSlot.feet, qtty: pairs },
];

const heads = (count = 1, earsPerHead = 2): Shape => [
    { slot: GearSlot.head, qtty: count },
    { slot: GearSlot.ear, qtty: count * earsPerHead },
];

const Shapes = {
    Humanoid: compactShape([
        ...heads(),
        { slot: GearSlot.neck, qtty: 1 },
        { slot: GearSlot.torso, qtty: 1 },
        { slot: GearSlot.back, qtty: 1 },
        { slot: GearSlot.waist, qtty: 1 },
        ...upperLimbs(),
        ...lowerLimbs(),
    ]),
};

function buildShape(slots: string[]): Shape {
    const slotCounts: {[s: string]: number} = {};
    for (const s of slots) {
        if (s in GearSlot) {
            slotCounts[s] = (slotCounts[s] || 0) + 1;
        } else {
            throw new Error(`Unknown gear slot ${s}`);
        }
    }
    return Object.keys(slotCounts).map(s => ({slot: s as GearSlot, qtty: slotCounts[s]}));
}

export default GearSlot;
export {
    Shape,
    Shapes,
    buildShape,
};