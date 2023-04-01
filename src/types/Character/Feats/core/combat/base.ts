const CombatBaseFeat = {
    agileManeuvers: 'agileManeuvers',
    arcaneArmorTraining: 'arcaneArmorTraining',
    arcaneArmorMastery: 'arcaneArmorMastery',
    arcaneStrike: 'arcaneStrike',
    blindCombat: 'blindCombat',
    catchOffGuard: 'catchOffGuard',
    combatReflexes: 'combatReflexes',
    standStill: 'standStill',
    deadlyAim: 'deadlyAim',
    defensiveCombatTraining: 'defensiveCombatTraining',
    disruptive: 'disruptive',
    spellBreaker: 'spellBreaker',
    improvedInitiative: 'improvedInitiative',
    improvisedWeaponMastery: 'improvisedWeaponMastery',
    lunge: 'lunge',
    quickDraw: 'quickDraw',
    // rapidReload: 'rapidReload',
    stepUp: 'stepUp',
    strikeBack: 'strikeBack',
    throwAnything: 'throwAnything',
    toughness: 'toughness',
    weaponFinesse: 'weaponFinesse',
} as const;

type CombatBaseFeat = keyof typeof CombatBaseFeat;

export { CombatBaseFeat };
