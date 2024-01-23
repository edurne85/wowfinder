enum Rarity {
    trash = 'trash', // Useless / only for scraps
    vulgar = 'vulgar', // Commonly found from vendors
    common = 'common',
    uncommon = 'uncommon',
    rare = 'rare',
    epic = 'epic',
    legendary = 'legendary',
    artifact = 'artifact',
}

type ByRarity<Values> = Readonly<{ [key in Rarity]: Values }>;

const rarityMultipliers: ByRarity<number> = Object.freeze({
    trash: 0.1,
    vulgar: 0.5,
    common: 1,
    uncommon: 2,
    rare: 5,
    epic: 10,
    legendary: 100,
    artifact: 1000,
});

const iLevelMultipliers: ByRarity<number> = Object.freeze({
    trash: 0.5,
    vulgar: 0.8,
    common: 1,
    uncommon: 1.15,
    rare: 1.4,
    epic: 1.65,
    legendary: 2,
    artifact: Number.NaN,
});

const rarityColorsDark: ByRarity<`#${string}`> = Object.freeze({
    trash: '#555555',
    vulgar: '#9D9D9D',
    common: '#FFFFFF',
    uncommon: '#1EFF00',
    rare: '#0070DD',
    epic: '#A335EE',
    legendary: '#FF8000',
    artifact: '#E6CC80',
});

const rarityColorsLight: ByRarity<`#${string}`> = Object.freeze({
    trash: '#C8C8C8',
    vulgar: '#626262',
    common: '#000000',
    uncommon: '#1EFF00',
    rare: '#0070DD',
    epic: '#A335EE',
    legendary: '#FF8000',
    artifact: '#E6CC80',
});

export {
    Rarity,
    rarityMultipliers,
    iLevelMultipliers,
    rarityColorsDark,
    rarityColorsLight,
};
