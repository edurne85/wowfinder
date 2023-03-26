import { useTranslation } from 'react-i18next';
import { Reputation } from '../types/Faction';

function Rep(r: string): JSX.Element {
    const { t } = useTranslation();
    return <li>{t(`reputation.${r}`)}</li>;
}
function Reputations(): JSX.Element {
    return <ul>{Object.keys(Reputation).map(Rep)}</ul>;
}

export {
    Reputations,
};