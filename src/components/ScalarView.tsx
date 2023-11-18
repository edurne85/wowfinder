import { Scalar } from '@model/Units';
import { useTranslation } from 'react-i18next';

interface ScalarViewProps<T> {
    value: Scalar<T>;
}

function ScalarView<T>({ value }: ScalarViewProps<T>): React.JSX.Element {
    const [t, i18n] = useTranslation();
    const separator = i18n.exists('units.separator')
        ? t('units.separator')
        : ' ';
    const unit = i18n.exists(`units.${value.unit}`)
        ? t(`units.${value.unit}`)
        : `${value.unit}`;
    return (
        <span>
            {value.value}
            {separator}
            {unit}
        </span>
    );
}

export { ScalarView };
