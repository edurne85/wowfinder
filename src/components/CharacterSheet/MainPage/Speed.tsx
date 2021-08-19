import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Speeds } from "../../../@types/Character/Speeds";
import { LengthUnit, Speed as SpeedValue, SpeedUnit, TimeUnit } from "../../../@types/Units";
import { borderless, borderThick, borderThin, reverseColors, smallText } from "../../helpers/mixins";

const StyledTable = styled.table`
    & th, & td, & input {
        width: 11.5mm;
        text-align: center;
    }
    & td {
        ${borderThin}
        text-align: left;
    }
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
        width: 7mm;
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
}
function InputCell({id, speed, targetUnit}: {id: string, speed: SpeedValue, targetUnit: TargetUnit}) {
    return(<td>
        <input id={id} value={Math.round(speed.as(targetUnit.unit))} readOnly={true}/>
        <span className="suffix">{targetUnit.suffix}</span>
    </td>);
}
function EmptySpeed() {
    return (<>
        <td></td>
        <td></td>
        <td></td>
    </>);
}
function SpeedCells({name, speed}: {name: string, speed: SpeedValue}) {
    return speed.value === 0
        ? <EmptySpeed />
        :(<>
            <InputCell id={`txtSpeed${name}Feet`} speed={speed} targetUnit={targetUnits.feet} />
            <InputCell id={`txtSpeed${name}Meters`} speed={speed} targetUnit={targetUnits.meters} />
            <InputCell id={`txtSpeed${name}Squares`} speed={speed} targetUnit={targetUnits.squares} />
        </>);
}

export function Speed ({speeds}: {speeds: Speeds}) {
    const { t } = useTranslation();
    return (<StyledTable>
        <tbody>
            <tr>
                <th>{t('ui.speed.base')}</th>
                <SpeedCells name="Base" speed={speeds.base} />
                <th>{t('ui.speed.load')}</th>
                <SpeedCells name="Load" speed={speeds.encumbered} />
            </tr>
            <tr>
                <th>{t('ui.speed.fly')}</th>
                <SpeedCells name="Fly" speed={speeds.fly.speed} />
                <td colSpan={2}>{t('ui.speed.maneuverability')}</td>
                <td colSpan={2}><select id="mnuFlyManeuverability">{/* TODO */}</select></td>
            </tr>
            <tr>
                <th>{t('ui.speed.swim')}</th>
                <SpeedCells name="Swim" speed={speeds.swim} />
                <th>{t('ui.speed.climb')}</th>
                <SpeedCells name="Climb" speed={speeds.climb} />
            </tr>
            <tr>
                <th>{t('ui.speed.burrow')}</th>
                <SpeedCells name="Burrow" speed={speeds.burrow} />
                <th>{t('ui.speed.misc')}</th>
                <SpeedCells name="Misc" speed={speeds.misc} />
            </tr>
        </tbody>
    </StyledTable>);
}

