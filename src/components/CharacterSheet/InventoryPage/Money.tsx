import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../helpers/GlobalContext';
import styled from 'styled-components';
import { Money as M, CoinType } from '../../../types/Item/Money';
import type { CoinsProps } from '../../Money';
import { CoinsSuffix, MoneyBreakown } from '../../Money';
import Header from '../../helpers/Header';

const MoneyContainer = styled.span`
    & > h1 {
        display: inline-block;
        margin-right: 2em;
    }

    & > span > span.amount {
        display: inline-block;
        min-width: 3em;
        text-align: right;
        border-bottom: thin dashed #ccc;
    }
`;

function Coins({ type, amount }: CoinsProps): React.JSX.Element {
    const { t } = useTranslation();
    const context = useContext(GlobalContext);
    return (
        <span title={t(`charsheet.inventory.money.full.${type}`) || undefined}>
            <span className="amount">
                {context.forceBlank ? '' : amount || 0}
            </span>
            <CoinsSuffix type={type} />
        </span>
    );
}

interface MoneyProps {
    money?: M;
}

function Money({ money = M.fromRaw(0) }: MoneyProps): React.JSX.Element {
    const { t } = useTranslation();
    const context = useContext(GlobalContext);
    const filter = (money: M, type: CoinType): boolean =>
        context.forceBlank || money.split[type] > 0;
    return (
        <MoneyContainer>
            <Header>{t('charsheet.inventory.money.h')}</Header>
            <MoneyBreakown money={money} filter={filter} Component={Coins} />
        </MoneyContainer>
    );
}

export { Money };
