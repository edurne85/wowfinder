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

const rarityMultipliers: { [key in Rarity]: number } = Object.freeze({
    [Rarity.trash]: 0.1,
    vulgar: 0.5,
    common: 1,
    uncommon: 2,
    rare: 5,
    epic: 10,
    legendary: 100,
    artifact: 1000,
});

const rarityColorsDark: { [key in Rarity]: string } = Object.freeze({
    trash: '#555555',
    vulgar: '#9D9D9D',
    common: '#FFFFFF',
    uncommon: '#1EFF00',
    rare: '#0070DD',
    epic: '#A335EE',
    legendary: '#FF8000',
    artifact: '#E6CC80',
});

const rarityColorsLight: { [key in Rarity]: string } = Object.freeze({
    trash: '#C8C8C8',
    vulgar: '#626262',
    common: '#000000',
    uncommon: '#1EFF00',
    rare: '#0070DD',
    epic: '#A335EE',
    legendary: '#FF8000',
    artifact: '#E6CC80',
});

export { Rarity, rarityMultipliers, rarityColorsDark, rarityColorsLight };
