const CombatShieldFeat = {
    proficiencyShield: 'proficiencyShield',
    weaponFocusShield: 'weaponFocusShield',
    greaterWeaponFocusShield: 'greaterWeaponFocusShield',
} as const;

type CombatShieldFeat = keyof typeof CombatShieldFeat;

export { CombatShieldFeat };
