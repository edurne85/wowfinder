import { useTranslation } from 'react-i18next';
import type { SpellPowerBonusViewArgs } from '../helpers';
import { CastingMode, School, SubSchool } from '@model/Magic';

import { useNumberFormatters } from '@hooks';

function SpellPowerBonusSummaryView({
    spellPowerBonus,
}: SpellPowerBonusViewArgs): React.JSX.Element {
    const { t } = useTranslation();
    const { signedNonZero: format } = useNumberFormatters();
    return (
        <p>
            <b>{t('charsheet.magic.power')}: </b>
            {Object.keys(CastingMode)
                .map(k => k as CastingMode)
                .filter(k => spellPowerBonus[k] !== 0)
                .map(
                    k =>
                        `${t(`magic.modes.abbr.${k}`)}: ${format(
                            spellPowerBonus[k],
                        )}`,
                )
                .join(', ')}
            {Object.keys(School)
                .map(k => k as School)
                .filter(k => spellPowerBonus[k] !== 0)
                .map(
                    k =>
                        `${t(`magic.schools.${k}`)}: ${format(
                            spellPowerBonus[k],
                        )}`,
                )
                .join(', ')}
            {Object.keys(SubSchool)
                .map(k => k as SubSchool)
                .filter(k => spellPowerBonus[k] !== 0)
                .map(
                    k =>
                        `${t(`magic.schools.sub.${k}`)}: ${format(
                            spellPowerBonus[k],
                        )}`,
                )
                .join(', ')}
        </p>
    );
}

function ConditionalSpellPowerBonusSummaryView({
    spellPowerBonus,
}: Partial<SpellPowerBonusViewArgs>): React.JSX.Element {
    return spellPowerBonus && !spellPowerBonus.isZero ? (
        <SpellPowerBonusSummaryView spellPowerBonus={spellPowerBonus} />
    ) : (
        <></>
    );
}

export { SpellPowerBonusSummaryView, ConditionalSpellPowerBonusSummaryView };
