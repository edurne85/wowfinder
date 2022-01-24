import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Character from '../../../@types/Character';
import Inventory from '../../../@types/Items/Inventory';
import Columns from '../../helpers/Columns';
import Header from '../../helpers/Header';
import { debugOutline, scrollable } from '../../helpers/mixins';
import Page from '../../helpers/Page';
import { Gear } from './Gear';
import { Money } from './Money';

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

export function InventoryPage({char, visible = true}: {char?: Character, visible?: boolean}): JSX.Element {
    const inventory = char?.inventory || new Inventory({});
    const { t } = useTranslation();
    // TODO Gear (equipped), carried, owned
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