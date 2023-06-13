import { useTranslation } from 'react-i18next';
import type { ResistBonusViewArgs } from '../helpers';
import { DamageType } from '../../../types/Damage';

function ResistBonusSummaryView({
    resistBonus,
}: ResistBonusViewArgs): React.JSX.Element {
    const { t, i18n } = useTranslation();
    const format = Intl.NumberFormat(i18n.languages[0], {
        signDisplay: 'exceptZero',
    }).format;
    const v = resistBonus.values;
    return (
        <p>
            {t('charsheet.resist.h')}:{' '}
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
