import { capitalizeFirstLetter } from '../../../utils';
import { ExoticWeaponProficiency, MartialWeaponProficiency, SimpleWeaponProficiency } from '../../Item/Gear/Weapon/Proficiency';

enum CoreFeat {
    endurance = 'endurance',
    diehard = 'diehard',
    fleet = 'fleet',
    leadership = 'leadership',
    nimbleMoves = 'nimbleMoves',
    acrobaticSteps = 'acrobaticSteps',
    run = 'run',
    greatFortitude = 'greatFortitude',
    improvedGreatFortitude = 'improvedGreatFortitude',
    ironWill = 'ironWill',
    improvedIronWill = 'improvedIronWill',
    lightningReflexes = 'lightningReflexes',
    improvedLightningReflexes = 'improvedLightningReflexes',
    extraKi = 'extraKi',
    // TODO Define corresponding class features to enable these feats:
    // extraLayOnHands = 'extraLayOnHands',
    // extraMercy = 'extraMercy',
    // extraPerform = 'extraPerform',
    extraRage = 'extraRage',
    // improvedFamiliar = 'improvedFamiliar',
    channelAlignment = 'channelAlignment',
    commandUndead = 'commandUndead',
    elementalChannel = 'elementalChannel',
    extraChannel = 'extraChannel',
    improvedChannel = 'improvedChannel',
    selectiveChannel = 'selectiveChannel',
    turnUndead = 'turnUndead',
    channelSmite = 'channelSmite',
    combatCasting = 'combatCasting',
    eschewMaterials = 'eschewMaterials',
    improvedCounterspell = 'improvedCounterspell',
    // Removed: spellMastery
    // Removed - new score: spellPenetration
    scribeScroll = 'scribeScroll',
    brewPotion = 'brewPotion',
    craftWondrousItem = 'craftWondrousItem',
    craftArmsArmor = 'craftArmsArmor',
    craftWand = 'craftWand',
    craftRing = 'craftRing',
    craftRod = 'craftRod',
    craftStaff = 'craftStaff',
    spellFocusAbjuration = 'spellFocusAbjuration',
    greaterSpellFocusAbjuration = 'greaterSpellFocusAbjuration',
    spellFocusConjuration = 'spellFocusConjuration',
    greaterSpellFocusConjuration = 'greaterSpellFocusConjuration',
    augmentSummoning = 'augmentSummoning',
    spellFocusDivination = 'spellFocusDivination',
    greaterSpellFocusDivination = 'greaterSpellFocusDivination',
    spellFocusEnchantment = 'spellFocusEnchantment',
    greaterSpellFocusEnchantment = 'greaterSpellFocusEnchantment',
    spellFocusEvocation = 'spellFocusEvocation',
    greaterSpellFocusEvocation = 'greaterSpellFocusEvocation',
    spellFocusIllusion = 'spellFocusIllusion',
    greaterSpellFocusIllusion = 'greaterSpellFocusIllusion',
    spellFocusNecromancy = 'spellFocusNecromancy',
    greaterSpellFocusNecromancy = 'greaterSpellFocusNecromancy',
    spellFocusTransmutation = 'spellFocusTransmutation',
    greaterSpellFocusTransmutation = 'greaterSpellFocusTransmutation',
    empowerSpell = 'empowerSpell',
    enlargeSpell = 'enlargeSpell',
    extendSpell = 'extendSpell',
    heightenSpell = 'heightenSpell',
    maximizeSpell = 'maximizeSpell',
    quickenSpell = 'quickenSpell',
    silentSpell = 'silentSpell',
    stillSpell = 'stillSpell',
    widenSpell = 'widenSpell',
    agileManeuvers = 'agileManeuvers',
    arcaneArmorTraining = 'arcaneArmorTraining',
    arcaneArmorMastery = 'arcaneArmorMastery',
    arcaneStrike = 'arcaneStrike',
    blindCombat = 'blindCombat',
    catchOffGuard = 'catchOffGuard',
    cleave = 'cleave',
    greatCleave = 'greatCleave',
    powerAttack = 'powerAttack',
    vitalStrike = 'vitalStrike',
    improvedVitalStrike = 'improvedVitalStrike',
    greaterVitalStrike = 'greaterVitalStrike',
    dodge = 'dodge',
    combatReflexes = 'combatReflexes',
    standStill = 'standStill',
    deadlyAim = 'deadlyAim',
    defensiveCombatTraining = 'defensiveCombatTraining',
    disruptive = 'disruptive',
    spellBreaker = 'spellBreaker',
    improvedInitiative = 'improvedInitiative',
    improvisedWeaponMastery = 'improvisedWeaponMastery',
    lunge = 'lunge',
    quickDraw = 'quickDraw',
    // rapidReload = 'rapidReload',
    stepUp = 'stepUp',
    strikeBack = 'strikeBack',
    throwAnything = 'throwAnything',
    toughness = 'toughness',
    weaponFinesse = 'weaponFinesse',
    proficiencyShield = 'proficiencyShield',
    weaponFocusShield = 'weaponFocusShield',
    greaterWeaponFocusShield = 'greaterWeaponFocusShield',
    twoWeaponFighting = 'twoWeaponFighting',
    doubleSlice = 'doubleSlice',
    twoWeaponRend = 'twoWeaponRend',
    improvedTwoWeaponFighting = 'improvedTwoWeaponFighting',
    greaterTwoWeaponFighting = 'greaterTwoWeaponFighting',
    twoWeaponDefense = 'twoWeaponDefense',
}

const weaponFeats: {[key: string]: string} = {};

const profKeys = {
    simple: Object.keys(SimpleWeaponProficiency),
    martial: Object.keys(MartialWeaponProficiency),
    exotic: Object.keys(ExoticWeaponProficiency),
};

const nonSimple = [...profKeys.martial, ...profKeys.exotic];
const allWeapons = [...profKeys.simple, ...profKeys.martial, ...profKeys.exotic];

for (const p of nonSimple) {
    const w = capitalizeFirstLetter(p);
    weaponFeats[`proficiency${w}`] = `proficiency${w}`;
}

for (const p of allWeapons) {
    const w = capitalizeFirstLetter(p);
    weaponFeats[`weaponFocus${w}`] = `weaponFocus${w}`;
    weaponFeats[`greaterWeaponFocus${w}`] = `greaterWeaponFocus${w}`;
    weaponFeats[`weaponSpecialization${w}`] = `weaponSpecialization${w}`;
    weaponFeats[`greaterWeaponSpecialization${w}`] = `greaterWeaponSpecialization${w}`;
}

const Feat = {
    ...CoreFeat,
    ...weaponFeats,
};

type Feat = keyof typeof Feat;

export { Feat };
