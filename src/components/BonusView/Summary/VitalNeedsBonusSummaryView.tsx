import { VitalNeeds } from '@model/Character/Bonus';
import { useTranslation } from 'react-i18next';

interface VitalNeedsEntryArgs {
    label: string;
    value: boolean;
}

function VitalNeedsEntry({
    label,
    value,
}: VitalNeedsEntryArgs): React.JSX.Element {
    const { t } = useTranslation();
    function str(bool: boolean): string {
        return bool ? t('keywords.yes') : t('keywords.no');
    }
    return (
        <span>
            <b>{t(`bonus.vital.${label}`)}: </b>
            {str(value)}.
        </span>
    );
}

function ConditionalVitalNeedsEntry({
    label,
    value,
}: VitalNeedsEntryArgs): React.JSX.Element | null {
    return value ? null : <VitalNeedsEntry label={label} value={value} />;
}

interface VitalNeedsBonusSummaryViewArgs {
    vitalNeedsBonus: VitalNeeds;
}

function VitalNeedsBonusSummaryView({
    vitalNeedsBonus,
}: VitalNeedsBonusSummaryViewArgs): React.JSX.Element {
    return (
        <p>
            <ConditionalVitalNeedsEntry
                label="breathe"
                value={vitalNeedsBonus.breathe}
            />
            <ConditionalVitalNeedsEntry
                label="eat"
                value={vitalNeedsBonus.eat}
            />
            <ConditionalVitalNeedsEntry
                label="sleep"
                value={vitalNeedsBonus.sleep}
            />
        </p>
    );
}

function ConditionalVitalNeedsBonusSummaryView({
    vitalNeedsBonus,
}: Partial<VitalNeedsBonusSummaryViewArgs>): React.JSX.Element {
    return vitalNeedsBonus && !vitalNeedsBonus.isZero ? (
        <VitalNeedsBonusSummaryView vitalNeedsBonus={vitalNeedsBonus} />
    ) : (
        <></>
    );
}

export { VitalNeedsBonusSummaryView, ConditionalVitalNeedsBonusSummaryView };
