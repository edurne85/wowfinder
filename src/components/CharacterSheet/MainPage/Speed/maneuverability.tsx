import { useTranslation } from 'react-i18next';
import {
    FlyManeuverability,
    ManeuverabilitySortedValues,
} from '../../../../types/Character/Speeds';

function Maneuverability({
    value,
}: {
    value?: FlyManeuverability;
}): JSX.Element {
    const { t: translate } = useTranslation();
    const t = (key: string): string =>
        translate(`charsheet.speed.maneuverability.${key}`);
    return (
        <>
            <td colSpan={2}>{t('h')}</td>
            <td colSpan={2}>
                <select id="mnuFlyManeuverability">
                    <option value="" selected={!value}></option>
                    {ManeuverabilitySortedValues.map(v => (
                        <option key={v} value={v} selected={v === value}>
                            {t(v)}
                        </option>
                    ))}
                </select>
            </td>
        </>
    );
}

export { Maneuverability };
