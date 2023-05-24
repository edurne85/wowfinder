export interface Reward {
    [factionLabel: string]: number;
}

export interface Rewards {
    [characterKey: string]: Reward;
}
