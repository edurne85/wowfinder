import { useTranslation } from 'react-i18next';
import { Item, Weapon } from '../../../../types/Item';
import { Damage } from '../Damage';
import { DetailLine } from './base';

function WeaponBonusDamage({ weapon }: { weapon: Weapon }): JSX.Element {
    const { t } = useTranslation();
    const h = t('charsheet.inventory.gear.bonusDamage');
    return weapon.hasBonusDamage ? (
        <DetailLine h={h}>
            <Damage damage={weapon.bonusDamage} />
        </DetailLine>
    ) : (
        <></>
    );
}

function WeaponDamage({ weapon }: { weapon: Weapon }): JSX.Element {
    const { t } = useTranslation();
    const critRange =
        weapon.criticalRange >= 20 ? '20' : `${weapon.criticalRange} - 20`;
    const hasCrit = weapon.criticalMultiplier > 1;
    return (
        <>
            <DetailLine h={t('charsheet.inventory.gear.baseDamage')}>
                <Damage damage={weapon.baseDamage} />
                {hasCrit
                    ? `(${critRange} / ×${Math.floor(
                          weapon.criticalMultiplier
                      )})`
                    : ''}
            </DetailLine>
            <WeaponBonusDamage weapon={weapon} />
        </>
    );
}

function WeaponIntrinsicMod({ weapon }: { weapon: Weapon }): JSX.Element {
    const { t } = useTranslation();
    const i = weapon.intrinsic;
    const prefix = i > 0 ? '+' : '';
    const h = t('charsheet.inventory.gear.intrinsic');
    return i === 0 ? (
        <></>
    ) : (
        <DetailLine h={h}>
            {prefix}
            {i}
        </DetailLine>
    );
}

function WeaponGrouping({ weapon }: { weapon: Weapon }): JSX.Element {
    const { t } = useTranslation();
    const groups = Array.from(weapon.groups)
        .map(g => t(`gear.weapon.group.${g}`))
        .join(t('gear.weapon.group.$separator'));
    const rank = `${weapon.rank}`; // TODO: localize
    const proficiency = `${weapon.proficiency}`; // TODO: localize
    return (
        <DetailLine>
            {rank}: {proficiency} ({groups})
        </DetailLine>
    );
}

function WeaponDetails({ weapon }: { weapon: Weapon }): JSX.Element {
    const { t } = useTranslation();
    const range: string = weapon.ranged
        ? weapon.range.fullDisplay
        : t('charsheet.inventory.gear.range.melee');
    return (
        <>
            <DetailLine h={t('charsheet.inventory.gear.range.h')}>{range}</DetailLine>
            <WeaponDamage weapon={weapon} />
            <WeaponIntrinsicMod weapon={weapon} />
            <WeaponGrouping weapon={weapon} />
        </>
    );
}

function WeaponDetailsWrapped({ item }: { item: Item }): JSX.Element {
    return item instanceof Weapon ? <WeaponDetails weapon={item} /> : <></>;
}

export {
    WeaponDetailsWrapped,
};
