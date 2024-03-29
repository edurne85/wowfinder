import { useTranslation } from 'react-i18next';
import type { ResistBonusViewArgs } from '../helpers';
import { DamageType } from '@model/Damage';
import { useNumberFormatters } from '@hooks';

function ResistBonusSummaryView({
    resistBonus,
}: ResistBonusViewArgs): React.JSX.Element {
    const { t } = useTranslation();
    const { signedNonZero: format } = useNumberFormatters();
    const v = resistBonus.values;
    return (
        <p>
            <b>{t('charsheet.resist.h')}: </b>
            {Object.values(DamageType)
                .filter(key => v[key] !== 0)
                .map(
                    key => `${t(`damageTypes.abbr.${key}`)}: ${format(v[key])}`,
                )
                .join(', ')}
        </p>
    );
}

function ConditionalResistBonusSummaryView({
    resistBonus,
}: Partial<ResistBonusViewArgs>): React.JSX.Element {
    return resistBonus && !resistBonus.isZero ? (
        <ResistBonusSummaryView resistBonus={resistBonus} />
    ) : (
        <></>
    );
}

export { ResistBonusSummaryView, ConditionalResistBonusSummaryView };
