import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Money as M, CoinType, displayCoinTypes } from '../../../@types/Item/Money';
import Header from '../../helpers/Header';


const colors: {[key in CoinType]: string} = {
    'g': '#cc9900',
    's': '#999999',
    'c': '#cc6633',
};

const CoinsContainer = styled.span``;
const CoinsSuffix = styled.span<{color: string}>`
    color: ${p => (p.color)};
`;

const InlineHeader = styled(Header)`
    display: inline-block;
    margin-right: 2em;
`;

function Coins({type, ammount} : {type: CoinType, ammount: number}): JSX.Element {
    const { t } = useTranslation();
    return (<CoinsContainer title={t(`ui.inventory.money.full.${type}`)}>
        {ammount || 0}
        <CoinsSuffix color={colors[type]}>{t(`ui.inventory.money.abbr.${type}`)}</CoinsSuffix>
    </CoinsContainer>);
}

export function Money({ammount = 0}: {ammount?: number}): JSX.Element {
    const { t } = useTranslation();
    const breakdown = M.fromRaw(ammount).split;
    return (<span>
        <InlineHeader>{t('ui.inventory.money.h')}</InlineHeader>
        {displayCoinTypes.filter(t => breakdown[t] > 0).map(t => (<Coins key={`money-${t}`} type={t} ammount={breakdown[t]} />))}
    </span>);
}