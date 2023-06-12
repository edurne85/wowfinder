enum StatPhysical {
    STR = 'STR',
    DEX = 'DEX',
    CON = 'CON',
}

enum StatMental {
    INT = 'INT',
    WIS = 'WIS',
    CHA = 'CHA',
}

const StatKey = {
    ...StatPhysical,
    ...StatMental,
} as const;

type StatKey = (typeof StatKey)[keyof typeof StatKey];

const StatKeys: StatKey[] = [
    StatKey.STR,
    StatKey.DEX,
    StatKey.CON,
    StatKey.INT,
    StatKey.WIS,
    StatKey.CHA,
];

export { StatKey, StatKeys, StatPhysical, StatMental };
