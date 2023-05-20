import { useTranslation } from 'react-i18next';
import { Money as M, CoinType, displayCoinTypes } from '../types/Item/Money';

// TODO: address duplicity with src/componenbts/CharacterSheet/InventoryPage/Money.tsx

const colors: { [key in CoinType]: string } = {
    g: '#cc9900',
    s: '#999999',
    c: '#cc6633',
};

function Coins({
    type,
    ammount,
}: {
    type: CoinType;
    ammount: number;
}): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <span title={t(`charsheet.inventory.money.full.${type}`) || undefined}>
            {ammount}
            <span style={{ color: colors[type] }}>
                {t(`charsheet.inventory.money.abbr.${type}`)}
            </span>
        </span>
    );
}

function Money({ money }: { money: M }): React.JSX.Element {
    const breakdown = money.split;
    return (
        <span>
            {displayCoinTypes
                .filter(type => breakdown[type] > 0)
                .map(type => (
                    <Coins key={type} type={type} ammount={breakdown[type]} />
                ))}
        </span>
    );
}

export { Money };
