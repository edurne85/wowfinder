enum SimpleWeaponProficiency {
    unarmed = 'unarmed',
    gauntlet = 'gauntlet',
    dagger = 'dagger',
    daggerPunching = 'dagger Punching',
    gauntletSpiked = 'gauntledSpiked',
    maceLight = 'maceLight',
    sickle = 'sickle',
    club = 'club',
    maceHeavy = 'maceHeavy',
    morningstar = 'morningstar',
    shortspear = 'shortspear',
    longspear = 'longspear',
    quarterstaff = 'quarterstaff',
    spear = 'spear',
    blowgun = 'blowgun',
    crossbowHeavy = 'crossbowHeavy',
    crossbowLight = 'crossbowLight',
    dart = 'dart',
    javelin = 'javelin',
    sling = 'sling',
}

enum MartialWeaponProficiency {
    axeThrown = 'axeThrown',
    hammerLight = 'hammerLight',
    axeHand = 'axeHand',
    kukri = 'kukri',
    pickLight = 'pickLight',
    sap = 'sap',
    shieldLight = 'shieldLight',
    starKnife = 'starKnife',
    swordShort = 'swordShort',
    axeBattle = 'axeBattle',
    flail = 'flail',
    swordLong = 'swordLong',
    pickHeavy = 'pickHeavy',
    rapier = 'rapier',
    scimitar = 'scimitar',
    shieldHeavy = 'shieldHeavy',
    trident = 'trident',
    warhammer = 'warhammer',
    falchion = 'falchion',
    glaive = 'glaive',
    axeGreat = 'axeGreat',
    clubGreat = 'clubGreat',
    flailHeavy = 'flairHeavy',
    swordGreat = 'swordGreat',
    guisarme = 'guisarme',
    halberd = 'halberd',
    lance = 'lance',
    ranseur = 'ranseur',
    scythe = 'scythe',
    bowLong = 'bowLong',
    bowLongComposite = 'bowLongComposite',
    bowShort = 'bowShort',
    bowShortComposite = 'bowShortComposite',
}

enum ExoticWeaponProficiency {
    kama = 'kama',
    nunchaku = 'nunchaku',
    sai = 'sai',
    siangham = 'siangham',
    swordBastard = 'swordBastard',
    axeWarDwarven = 'axeWarDwarven',
    whip = 'whip',
    axeDoubleOrc = 'axeDoubleOrc',
    chainSpiled = 'chainSpiked',
    bladeCurveElven = 'bladeCurveElven',
    flailDire = 'flailDire',
    hammerHookedGnome = 'hammerHookedGnome',
    swordTwoBladed = 'swordTwoBladed',
    urgoshDwarven = 'urgoshDwarven',
    bolas = 'bolas',
    crossbowHand = 'crossbowHand',
    crossbowRepeatingHeavy = 'crossbowRepeatingHeavy',
    crossbowRepeatingLight = 'crossbowRepeatingLight',
    net = 'net',
    shuriken = 'shuriken',
    slingStaffHalfling = 'slingStaffHalfling',
}

const WeaponProficiency = {
    ...SimpleWeaponProficiency,
    ...MartialWeaponProficiency,
    ...ExoticWeaponProficiency,
};

type WeaponProficiency = typeof WeaponProficiency;

export default WeaponProficiency;

export {
    WeaponProficiency,
    SimpleWeaponProficiency,
    MartialWeaponProficiency,
    ExoticWeaponProficiency,
};