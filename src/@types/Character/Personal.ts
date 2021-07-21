import Alignment from './Alignment';

export default interface CharPersonalDetails {
    align: Alignment,
    fullName: string,
    height: number, // Inches
    weight: number, // Pounds
    faith: string,
    origin: string,
    hair: string,
    eyes: string,
    gender: string,
}

const personalDefaults: CharPersonalDetails = {
    align: Alignment.NN,
    height: 63, // 5'3" ~ 1m60cm
    weight: 143, // ~ 65kg
    fullName: '',
    faith: '',
    origin: '',
    hair: '',
    eyes: '',
    gender: '',
};

export {
    personalDefaults,
};