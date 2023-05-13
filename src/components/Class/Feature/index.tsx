import { ClassFeature } from '../../../types/Character/Class/Features';
import { useTranslation } from 'react-i18next';

export function Feature(feature: ClassFeature, value: number): JSX.Element {
    const { t } = useTranslation();
    return (
        <>
            {t(feature)} ({value})
        </>
    );
}
