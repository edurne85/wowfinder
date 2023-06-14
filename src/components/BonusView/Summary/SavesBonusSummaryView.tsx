import { useTranslation } from 'react-i18next';
import type { SavesBonusViewArgs } from '../helpers';
import { useNumberFormatters } from '@hooks';
import { SaveType } from '@model/Character/Saves';

function SavesBonusSummaryView({
    savesBonus,
}: SavesBonusViewArgs): React.JSX.Element {
    const { t } = useTranslation();
    const { signedNonZero: format } = useNumberFormatters();
    const values = savesBonus.indexed;
    return (
        <p>
            {t('charsheet.saves.h')}:{' '}
            {['fort', 'refl', 'will']
                .map(k => k as SaveType)
                .filter(k => values[k])
                .map(
                    k =>
                        `${t(`charsheet.saves.abbr.${k}`)}: ${format(
                            values[k],
                        )}`,
                )
                .join(', ')}
        </p>
    );
}

function ConditionalSavesBonusSummaryView({
    savesBonus,
}: Partial<SavesBonusViewArgs>): React.JSX.Element {
    return savesBonus && !savesBonus.isZero ? (
        <SavesBonusSummaryView savesBonus={savesBonus} />
    ) : (
        <></>
    );
}

export { SavesBonusSummaryView, ConditionalSavesBonusSummaryView };
