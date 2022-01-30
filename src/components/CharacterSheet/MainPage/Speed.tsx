import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Speeds } from '../../../@types/Character/Speeds';
import { LengthUnit, Speed as SpeedValue, SpeedUnit, TimeUnit } from '../../../@types/Units';
import { InputSuffixedCell } from '../../helpers/InputCell';
import { borderless, borderThick, borderThin, printableBottomBorder, reverseColors, smallText } from '../../helpers/mixins';

const StyledTable = styled.table`
    & th, & td, & input {
        width: 11.5mm;
        text-align: center;
    }
    & td {
        ${borderThin}
        text-align: left;
    }
    ${printableBottomBorder('& td')}
    & td.thick {
        ${borderThick}
    }
    & tbody th {
        ${reverseColors}
    }
    & thead th {
        ${smallText}
    }
    & input {
        width: 6mm;
        text-align: right;
        ${borderless};
    }
    & span.suffix {
        text-align: left;
    }
    & td[colspan="2"] {
        font-size: 10pt;
        select {
            width: 100%;
        }
        ${borderless}
    }
`;

interface TargetUnit {
    unit: SpeedUnit,
    suffix: string,
}

const targetUnits: {[key:string]: TargetUnit} = {
    feet: {
        unit: new SpeedUnit({ length: LengthUnit.foot, time: TimeUnit.turn }),
        suffix: '\'',
    },
    meters: {
        unit: new SpeedUnit({ length: LengthUnit.meter, time: TimeUnit.turn }),
        suffix: 'm',
    },
    squares: {
        unit: new SpeedUnit({ length: LengthUnit.square, time: TimeUnit.turn }),
        suffix: '□',
    },
};

function EmptySpeed(): JSX.Element {
    return (<>
        <td></td>
        <td></td>
        <td></td>
    </>);
}

function InputSpeedCell({id, speed, targetUnit}: {id: string, speed?: SpeedValue, targetUnit: TargetUnit}): JSX.Element {
    const value = speed != null ? Math.round(speed.as(targetUnit.unit)) : '';
    return <InputSuffixedCell id={id} value={value} suffix={targetUnit.suffix} />;
}

function SpeedCells({name, speed}: {name: string, speed?: SpeedValue}): JSX.Element {
    return !speed || !speed.value
        ? <EmptySpeed />
        :(<>
            <InputSpeedCell id={`txtSpeed${name}Feet`} speed={speed} targetUnit={targetUnits.feet} />
            <InputSpeedCell id={`txtSpeed${name}Meters`} speed={speed} targetUnit={targetUnits.meters} />
            <InputSpeedCell id={`txtSpeed${name}Squares`} speed={speed} targetUnit={targetUnits.squares} />
        </>);
}

export function Speed ({speeds}: {speeds?: Speeds}): JSX.Element {
    const { t } = useTranslation();
    return (<StyledTable>
        <tbody>
            <tr>
                <th>{t('ui.speed.base')}</th>
                <SpeedCells name="Base" speed={speeds?.base} />
                <th>{t('ui.speed.load')}</th>
                <SpeedCells name="Load" speed={speeds?.encumbered} />
            </tr>
            <tr>
                <th>{t('ui.speed.fly')}</th>
                <SpeedCells name="Fly" speed={speeds?.fly.speed} />
                <td colSpan={2}>{t('ui.speed.maneuverability')}</td>
                <td colSpan={2}><select id="mnuFlyManeuverability">{/* TODO: maneuverability */}</select></td>
            </tr>
            <tr>
                <th>{t('ui.speed.swim')}</th>
                <SpeedCells name="Swim" speed={speeds?.swim} />
                <th>{t('ui.speed.climb')}</th>
                <SpeedCells name="Climb" speed={speeds?.climb} />
            </tr>
            <tr>
                <th>{t('ui.speed.burrow')}</th>
                <SpeedCells name="Burrow" speed={speeds?.burrow} />
                <th>{t('ui.speed.misc')}</th>
                <SpeedCells name="Misc" speed={speeds?.misc} />
            </tr>
        </tbody>
    </StyledTable>);
}

