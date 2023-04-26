const BaseFeat = {
    endurance: 'endurance',
    diehard: 'diehard',
    fleet: 'fleet',
    leadership: 'leadership',
    nimbleMoves: 'nimbleMoves',
    acrobaticSteps: 'acrobaticSteps',
    run: 'run',
    greatFortitude: 'greatFortitude',
    improvedGreatFortitude: 'improvedGreatFortitude',
    ironWill: 'ironWill',
    improvedIronWill: 'improvedIronWill',
    lightningReflexes: 'lightningReflexes',
    improvedLightningReflexes: 'improvedLightningReflexes',
} as const;

type BaseFeat = keyof typeof BaseFeat;

export { BaseFeat };
