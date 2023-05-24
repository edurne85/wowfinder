import { useTranslation } from 'react-i18next';
import { Money as M, CoinType, displayCoinTypes } from '../types/Item/Money';
import styled from 'styled-components';

const colors: { [key in CoinType]: string } = {
    g: '#cc9900',
    s: '#999999',
    c: '#cc6633',
};

const MoneyContainer = styled.span`
    & span.coins-suffix {
        margin-right: 0.25em;
    }
`;

function CoinsSuffix({ type }: { type: CoinType }): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <span className="coins-suffix" style={{ color: colors[type] }}>
            {t(`charsheet.inventory.money.abbr.${type}`)}
        </span>
    );
}

interface CoinsProps {
    type: CoinType;
    amount: number;
    key: string;
}

function Coins({
    type,
    amount,
}: {
    type: CoinType;
    amount: number;
}): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <span title={t(`charsheet.inventory.money.full.${type}`) || undefined}>
            {amount}
            <CoinsSuffix type={type} />
        </span>
    );
}

interface MoneyBreakownProps {
    money: M;
    filter?: (money: M, type: CoinType) => boolean;
    Component: React.ComponentType<CoinsProps>;
}
const defaultFilter = (money: M, type: CoinType): boolean =>
    money.split[type] > 0;

function MoneyBreakown({
    money,
    filter,
    Component,
}: MoneyBreakownProps): React.JSX.Element {
    const f = (type: CoinType): boolean =>
        (filter || defaultFilter)(money, type);
    return (
        <>
            {displayCoinTypes.filter(f).map(type => (
                <Component key={type} type={type} amount={money.split[type]} />
            ))}
        </>
    );
}

function Money({ money }: { money: M }): React.JSX.Element {
    return (
        <MoneyContainer>
            <MoneyBreakown money={money} Component={Coins} />
        </MoneyContainer>
    );
}

export type { CoinsProps };
export { Money, CoinsSuffix, MoneyBreakown };
