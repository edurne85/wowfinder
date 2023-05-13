import { useTranslation } from 'react-i18next';
import { Speeds } from '../../../../types/Character/Speeds';
import { Speed as SpeedValue } from '../../../../types/Units';
import { StyledTable } from './styled';
import { SpeedCells } from './SpeedCells';
import { Maneuverability } from './maneuverability';

function Cells({
    hkey,
    name,
    speed,
}: {
    hkey: string;
    name: string;
    speed?: SpeedValue;
}): JSX.Element {
    const { t } = useTranslation();
    const heading = t(`charsheet.speed.${hkey}`) || '';
    return (
        <>
            <SpeedCells heading={heading} name={name} speed={speed} />
        </>
    );
}

function Speed({ speeds }: { speeds?: Speeds }): JSX.Element {
    return (
        <StyledTable>
            <tbody>
                <tr>
                    <Cells hkey="base" name="Base" speed={speeds?.base} />
                    <Cells
                        hkey="reduced"
                        name="Reduced"
                        speed={speeds?.encumbered}
                    />
                </tr>
                <tr>
                    <Cells hkey="fly" name="Fly" speed={speeds?.fly.speed} />
                    <Maneuverability value={speeds?.fly.maneuverability} />
                </tr>
                <tr>
                    <Cells hkey="swim" name="Swim" speed={speeds?.swim} />
                    <Cells hkey="climb" name="Climb" speed={speeds?.climb} />
                </tr>
                <tr>
                    <Cells hkey="burrow" name="Burrow" speed={speeds?.burrow} />
                    <Cells hkey="misc" name="Misc" speed={speeds?.misc} />
                </tr>
            </tbody>
        </StyledTable>
    );
}

export { Speed };
