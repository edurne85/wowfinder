import { Length, LengthUnit, Mass, MassUnit, Time, TimeUnit } from '../Units';
import Alignment from './Alignment';

export default interface CharPersonalDetails {
    align: Alignment,
    fullName: string,
    height: Length,
    weight: Mass,
    faith: string,
    origin: string,
    hair: string,
    eyes: string,
    gender: string,
    age: Time,
}

const personalDefaults: CharPersonalDetails = {
    align: Alignment.NN,
    height: new Length({
        value: 63,
        unit: LengthUnit.inch,
    }), // 5'3" ~ 1m60cm
    weight: new Mass({
        value: 143,
        unit: MassUnit.lb,
    }), // ~ 65kg
    fullName: '',
    faith: '',
    origin: '',
    hair: '',
    eyes: '',
    gender: '',
    age: new Time({
        value: 20,
        unit: TimeUnit.year,
    }),
};

export {
    personalDefaults,
};