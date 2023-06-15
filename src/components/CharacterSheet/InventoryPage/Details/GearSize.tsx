import Size from '@model/Character/Size';
import { useTranslation } from 'react-i18next';

interface GearSizeViewProps {
    size: Size;
}

function GearSizeView({ size }: GearSizeViewProps): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <>
            <b>{t('size.h')}</b>: {t(`size.${size}`)}
        </>
    );
}

export { GearSizeView };
