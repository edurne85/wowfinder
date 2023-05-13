import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../helpers/GlobalContext';
import styled from 'styled-components';
import {
    Money as M,
    CoinType,
    displayCoinTypes,
} from '../../../types/Item/Money';
import Header from '../../helpers/Header';

const colors: { [key in CoinType]: string } = {
    g: '#cc9900',
    s: '#999999',
    c: '#cc6633',
};

const CoinsContainer = styled.span``;

const CoinsInnerContainer = styled.span`
    display: inline-block;
    min-width: 3em;
    text-align: right;
    border-bottom: thin dashed #ccc;
`;
const CoinsSuffix = styled.span<{ color: string }>`
    color: ${p => p.color};
`;

const InlineHeader = styled(Header)`
    display: inline-block;
    margin-right: 2em;
`;

function Coins({
    type,
    ammount,
}: {
    type: CoinType;
    ammount: number;
}): JSX.Element {
    const { t } = useTranslation();
    const context = useContext(GlobalContext);
    return (
        <CoinsContainer title={t(`charsheet.inventory.money.full.${type}`)}>
            <CoinsInnerContainer>
                {context.forceBlank ? '' : ammount || 0}
            </CoinsInnerContainer>
            <CoinsSuffix color={colors[type]}>
                {t(`charsheet.inventory.money.abbr.${type}`)}
            </CoinsSuffix>
        </CoinsContainer>
    );
}

export function Money({ ammount = 0 }: { ammount?: number }): JSX.Element {
    const { t } = useTranslation();
    const breakdown = M.fromRaw(ammount).split;
    const context = useContext(GlobalContext);
    return (
        <span>
            <InlineHeader>{t('charsheet.inventory.money.h')}</InlineHeader>
            {displayCoinTypes
                .filter(t => context.forceBlank || breakdown[t] > 0)
                .map(t => (
                    <Coins key={`money-${t}`} type={t} ammount={breakdown[t]} />
                ))}
        </span>
    );
}
