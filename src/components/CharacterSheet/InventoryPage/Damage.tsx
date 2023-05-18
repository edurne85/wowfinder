/* eslint-disable deprecation/deprecation */
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Damage as Dmg } from '../../../types/Damage/Damage';
import { DamageType } from '../../../types/Damage';
import Dice from '../../../types/Dice';
import { Join } from '../../helpers/Join';

const typeColors = {
    [DamageType.bludgeoning]: '#999',
    [DamageType.slashing]: '#999',
    [DamageType.piercing]: '#999',
    [DamageType.arcane]: '#3cc',
    [DamageType.fire]: '#f00',
    [DamageType.cold]: '#339',
    [DamageType.nature]: '#393',
    [DamageType.shadow]: '#909',
    [DamageType.holy]: '#ff9',
    [DamageType.psychic]: '#c6f',
};

function colorByType({ type }: { type: DamageType }): string {
    return typeColors[type];
}
const DamageComponentContainer = styled.span`
    text-decoration: underline;
    text-decoration-color: ${colorByType};
    margin: 0 0.2em;
`;

function DamageComponent({
    dice,
    type,
}: {
    dice?: Dice;
    type: DamageType;
}): React.JSX.Element {
    const { t } = useTranslation();
    return dice ? (
        <DamageComponentContainer
            type={type}
            title={t(`damageTypes.full.${type}`) ?? undefined}>
            {`${dice.toString()} ${t(`damageTypes.abbr.${type}`)}`}
        </DamageComponentContainer>
    ) : (
        <></>
    );
}

const DamageContainer = styled.span``;

/**
 * @deprecated
 */
export function Damage({ damage }: { damage: Dmg }): React.JSX.Element {
    return (
        <DamageContainer>
            <Join
                separator=" + "
                items={Object.keys(damage)
                    .map(k => k as DamageType)
                    .map(type => (
                        <DamageComponent
                            dice={damage[type]}
                            type={type}
                            key={`damage-component-${type}`}
                        />
                    ))}
            />
        </DamageContainer>
    );
}
