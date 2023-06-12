import { StatPhysical, StatMental, StatKey } from './keys';

enum StatGroup {
    physical = 'physical',
    mental = 'mental',
}

const statGroups = {
    [StatGroup.physical]: Object.keys(StatPhysical),
    [StatGroup.mental]: Object.keys(StatMental),
};

function inGroup(stat: StatKey, group: StatGroup): boolean {
    return statGroups[group].includes(stat);
}

export { StatGroup, statGroups, inGroup };
