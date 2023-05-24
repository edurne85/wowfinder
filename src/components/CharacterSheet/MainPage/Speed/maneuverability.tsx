import { useTranslation } from 'react-i18next';
import {
    FlyManeuverability,
    ManeuverabilitySortedValues,
} from '../../../../types/Character/Speeds';

function Maneuverability({
    value,
}: {
    value?: FlyManeuverability;
}): React.JSX.Element {
    const { t: translate } = useTranslation();
    const t = (key: string): string =>
        translate(`charsheet.speed.maneuverability.${key}`);
    return (
        <>
            <td colSpan={2}>{t('h')}</td>
            <td colSpan={2}>
                <select id="mnuFlyManeuverability" defaultValue={value}>
                    <option value=""></option>
                    {ManeuverabilitySortedValues.map(v => (
                        <option key={v} value={v}>
                            {t(v)}
                        </option>
                    ))}
                </select>
            </td>
        </>
    );
}

export { Maneuverability };
