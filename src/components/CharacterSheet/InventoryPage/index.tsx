import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Character from '../../../@types/Character';
import Stats from '../../../@types/Character/Stats';
import Inventory from '../../../@types/Items/Inventory';
import { convertMass, Mass, MassUnit } from '../../../@types/Units';
import { sum } from '../../../utils';
import Columns from '../../helpers/Columns';
import Header from '../../helpers/Header';
import { debugOutline, scrollable } from '../../helpers/mixins';
import Page from '../../helpers/Page';
import { Gear } from './Gear';
import { Money } from './Money';
import { Weight } from './Weight';

const Load = styled.div`
    ${debugOutline({color: '#909'})}
    ${scrollable}
    height: 137mm;
`;

const Possessions = styled.div`
    ${debugOutline({color: '#909'})}
    ${scrollable}
    height: 257mm;
`;

function pounds(mass: Mass): number {
    return convertMass(mass, MassUnit.lb).value;
}

export function InventoryPage({char, visible = true}: {char?: Character, visible?: boolean}): JSX.Element {
    const inventory = char?.inventory || new Inventory({});
    const carryLoad = sum(...inventory.gear.map(i => pounds(i.weight)));
    const carryCapacity = pounds((char?.stats || new Stats({})).carry);
    const { t } = useTranslation();
    // TODO (WiP) Gear (equipped)
    // TODO carried, owned
    return (<Page key="Gear" id="Gear" visible={visible}>
        <Header>{t('ui.inventory.h')}</Header>
        <Columns columns={[
            {
                key: 'GearLeft',
                id: 'GearLeft',
                children: (<>
                    <Header>{t('ui.inventory.gear.h')}</Header>
                    <Gear gear={inventory.gear} />
                    <Header>{t('ui.inventory.load.h')}</Header>
                    <Load />
                    <Header>{t('ui.inventory.weight.h')}</Header>
                    <Weight load={carryLoad} capacity={carryCapacity} />
                </>),
            },
            {
                key: 'GearRight',
                id: 'GearRight',
                children: (<>
                    <Money ammount={inventory.money.raw}></Money>
                    <Header>{t('ui.inventory.possessions')}</Header>
                    <Possessions />
                </>),
            }
        ]}></Columns>
    </Page>);
}