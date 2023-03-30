import { JsonValue } from '../../utils';
import {
    convertLength,
    convertMass,
    convertTime,
    Length,
    LengthUnit,
    Mass,
    MassUnit,
    Time,
    TimeUnit,
} from '../Units';
import Alignment from './Alignment';

interface DetailsCommon {
    fullName: string;
    faith: string;
    origin: string;
    hair: string;
    eyes: string;
    skin: string;
    gender: string;
}

export default interface CharPersonalDetails extends DetailsCommon {
    align: Alignment;
    height: Length;
    weight: Mass;
    age: Time;
}

interface CharPersonalDetailsBuilder extends DetailsCommon {
    [key: string]: JsonValue;
    align: string;
    height: number;
    weight: number;
    age: number;
}

const personalDefaults: CharPersonalDetails = {
    fullName: '',
    align: Alignment.NN,
    height: new Length({
        value: 63,
        unit: LengthUnit.inch,
    }), // 5'3" ~ 1m60cm
    weight: new Mass({
        value: 143,
        unit: MassUnit.lb,
    }), // ~ 65kg
    faith: '',
    origin: '',
    hair: '',
    eyes: '',
    skin: '',
    gender: '',
    age: new Time({
        value: 20,
        unit: TimeUnit.year,
    }),
};

function jsonImport(raw: any): CharPersonalDetails {
    const res = Object.assign({}, personalDefaults, raw);
    res.align = Object.values(Alignment).includes(res.align)
        ? res.align
        : Alignment.NN;
    res.height =
        res.height instanceof Length
            ? res.height
            : new Length({ value: res.height, unit: LengthUnit.inch });
    res.weight =
        res.weight instanceof Mass
            ? res.weight
            : new Mass({ value: res.weight, unit: MassUnit.lb });
    res.age =
        res.age instanceof Time
            ? res.age
            : new Time({ value: res.age, unit: TimeUnit.year });
    return res;
}

function jsonExport(source: CharPersonalDetails): CharPersonalDetailsBuilder {
    return {
        fullName: source.fullName,
        align: source.align.toString(),
        height: convertLength(source.height, LengthUnit.inch).value,
        weight: convertMass(source.weight, MassUnit.lb).value,
        faith: source.faith,
        origin: source.origin,
        hair: source.hair,
        eyes: source.eyes,
        skin: source.skin,
        gender: source.gender,
        age: convertTime(source.age, TimeUnit.year).value,
    };
}

export type { CharPersonalDetails, CharPersonalDetailsBuilder };
export { personalDefaults, jsonImport, jsonExport };
