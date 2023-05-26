interface RewardByFaction {
    [factionLabel: string]: number;
}

interface RewardByCharacter {
    [characterKey: string]: number;
}

interface RewardsByCharacter {
    [characterKey: string]: RewardByFaction;
}

interface RewardsByFaction {
    [factionLabel: string]: RewardByCharacter;
}

export {
    RewardByFaction,
    RewardsByCharacter,
    RewardsByFaction,
    RewardByCharacter,
};
