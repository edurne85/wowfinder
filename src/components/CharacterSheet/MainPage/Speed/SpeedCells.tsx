import {
    LengthUnit,
    SpeedUnit,
    Speed as SpeedValue,
    TimeUnit,
} from '../../../../types/Units';
import { InputSuffixedCell } from '../../../helpers/InputCell';
import { TargetUnit } from './base';

function InputSpeedCell({
    id,
    speed,
    targetUnit,
}: {
    id: string;
    speed?: SpeedValue;
    targetUnit: TargetUnit;
}): React.JSX.Element {
    const value = speed != null ? Math.round(speed.as(targetUnit.unit)) : '';
    return (
        <InputSuffixedCell id={id} value={value} suffix={targetUnit.suffix} />
    );
}

const targetUnits: { [key: string]: TargetUnit } = {
    feet: {
        unit: new SpeedUnit({ length: LengthUnit.foot, time: TimeUnit.turn }),
        suffix: "'",
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

function EmptySpeed({ heading }: { heading?: string }): React.JSX.Element {
    return (
        <>
            {heading ? <th>{heading}</th> : null}
            <td></td>
            <td></td>
            <td></td>
        </>
    );
}

function SpeedCells({
    name,
    speed,
    heading,
}: {
    name: string;
    speed?: SpeedValue;
    heading?: string;
}): React.JSX.Element {
    return !speed || !speed.value ? (
        <EmptySpeed heading={heading} />
    ) : (
        <>
            {heading ? <th>{heading}</th> : <></>}
            <InputSpeedCell
                id={`txtSpeed${name}Feet`}
                speed={speed}
                targetUnit={targetUnits.feet}
            />
            <InputSpeedCell
                id={`txtSpeed${name}Meters`}
                speed={speed}
                targetUnit={targetUnits.meters}
            />
            <InputSpeedCell
                id={`txtSpeed${name}Squares`}
                speed={speed}
                targetUnit={targetUnits.squares}
            />
        </>
    );
}

export { SpeedCells };
