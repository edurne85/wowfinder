import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Damage as Dmg } from '../../../@types/Damage';
import { DamageType } from '../../../@types/DamageType';
import Dice from '../../../@types/Dice';
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
};

function colorByType({ type }: { type: DamageType }): string {
    return typeColors[type];
}
const DamageComponentContainer = styled.span`
    text-decoration: underline;
    text-decoration-color: ${colorByType};
    margin: 0 0.2em;
`;

function DamageComponent({ dice, type }: { dice?: Dice, type: DamageType }): JSX.Element {
    const { t } = useTranslation();
    return dice ?
        (<DamageComponentContainer type={type} title={t(`damageTypes.full.${type}`)}>
            {dice.toString() + ' ' + t(`damageTypes.abbr.${type}`)}
        </DamageComponentContainer>) :
        (<></>);
}

const DamageContainer = styled.span``;

export function Damage({ damage }: { damage: Dmg }): JSX.Element {
    return (
        <DamageContainer>
            <Join
                separator=" + "
                items={Object.keys(damage).map(k => k as DamageType).map(type => (<DamageComponent dice={damage[type]} type={type} key={`damage-component-${type}`} />))} />
        </DamageContainer>
    );
}