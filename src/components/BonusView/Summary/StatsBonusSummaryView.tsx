import { useTranslation } from 'react-i18next';
import type { StatsBonusViewArgs } from '../helpers';
import { StatKeys } from '../../../types/Character/Stats';
import { useNumberFormatters } from '../../../hooks';

function StatsBonusSummaryView({
    statsBonus,
}: StatsBonusViewArgs): React.JSX.Element {
    const { t } = useTranslation();
    const { signedNonZero: format } = useNumberFormatters();
    const v = statsBonus.values;
    return (
        <p>
            {StatKeys.filter(key => v[key] !== 0)
                .map(key => `${t(`stats.abbr.${key}`)}: ${format(v[key])}`)
                .join(', ')}
        </p>
    );
}

function ConditionalStatsBonusSummaryView({
    statsBonus,
}: Partial<StatsBonusViewArgs>): React.JSX.Element {
    return statsBonus && !statsBonus.isZero ? (
        <StatsBonusSummaryView statsBonus={statsBonus} />
    ) : (
        <></>
    );
}

export { StatsBonusSummaryView, ConditionalStatsBonusSummaryView };
