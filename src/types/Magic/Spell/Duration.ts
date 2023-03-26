import { TFunction } from 'i18next';
import { Time } from '../../../types/Units';

type FixedSpellDuration = {
    durationType: 'fixed';
    duration: Time;
};

type PerLevelSpellDuration = {
    durationType: 'perLevel';
    duration: Time;
};

type SpellDuration =
    | 'instantaneous'
    | 'permanent'
    | FixedSpellDuration
    | PerLevelSpellDuration;

function stringify(value: SpellDuration, t: TFunction<'translation'>): string {
    if (value === 'instantaneous') {
        return t('magic.duration.instantaneous');
    } else if (value === 'permanent') {
        return t('magic.duration.permanent');
    } else if (value.durationType === 'fixed') {
        return t('magic.duration.fixed', { duration: value.duration });
    } else if (value.durationType === 'perLevel') {
        return t('magic.duration.perLevel', { duration: value.duration });
    } else {
        const unreachable: never = value;
        return unreachable;
    }
}

function tryParseSpellDuration(input: string): SpellDuration | undefined {
    if (input === 'instantaneous') {
        return 'instantaneous';
    } else if (input === 'permanent') {
        return 'permanent';
    }
    const levelMatches = /^(.*)\/level$/.exec(input);
    if (levelMatches) {
        const duration = Time.tryParseTime(levelMatches[1]);
        return duration ? { durationType: 'perLevel', duration } : undefined;
    }
    const fixedDuration = Time.tryParseTime(input);
    if (fixedDuration) {
        return { durationType: 'fixed', duration: fixedDuration };
    }
    return undefined;
}

export { SpellDuration, stringify, tryParseSpellDuration };
