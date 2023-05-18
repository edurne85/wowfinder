import { useTranslation } from 'react-i18next';
import { Character } from '../../../types/Character';
import Stats from '../../../types/Character/Stats';
import { Inventory } from '../../../types/Item/Inventory';
import { convertMass, Mass, MassUnit } from '../../../types/Units';
import Columns from '../../helpers/Columns';
import Header from '../../helpers/Header';
import Page from '../../helpers/Page';
import { ItemsList } from './ItemsList';
import { Money } from './Money';
import { Weight } from './Weight';

function pounds(mass: Mass): number {
    return convertMass(mass, MassUnit.lb).value;
}

export function InventoryPage({
    char,
    visible = true,
}: {
    char?: Character;
    visible?: boolean;
}): React.JSX.Element {
    const inventory = char?.inventory || new Inventory({});
    const carryCapacity = pounds((char?.stats || new Stats({})).carry);
    const { t } = useTranslation();
    return (
        <Page key="Gear" id="Gear" visible={visible}>
            <Header>{t('charsheet.inventory.h')}</Header>
            <Columns
                columns={[
                    {
                        key: 'GearLeft',
                        id: 'GearLeft',
                        children: (
                            <>
                                <Header>
                                    {t('charsheet.inventory.gear.h')}
                                </Header>
                                <ItemsList
                                    items={inventory.gear}
                                    maxLines={18}
                                    height={105}
                                    showSlots={true}
                                />
                                <Header>
                                    {t('charsheet.inventory.load.h')}
                                </Header>
                                <ItemsList
                                    items={inventory.carried}
                                    maxLines={23}
                                    height={133}
                                />
                                <Header>
                                    {t('charsheet.inventory.weight.h')}
                                </Header>
                                <Weight
                                    load={inventory.load}
                                    capacity={carryCapacity}
                                />
                            </>
                        ),
                    },
                    {
                        key: 'GearRight',
                        id: 'GearRight',
                        children: (
                            <>
                                <Money ammount={inventory.money.raw}></Money>
                                <Header>
                                    {t('charsheet.inventory.possessions')}
                                </Header>
                                <ItemsList
                                    items={inventory.carried}
                                    maxLines={44}
                                    height={257}
                                />
                            </>
                        ),
                    },
                ]}
            />
        </Page>
    );
}
