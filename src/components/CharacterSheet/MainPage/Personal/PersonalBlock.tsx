import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Race from '../../../../@types/Character/Race';
import { CharXpProps } from '../../base';
import PersonalEntryNumber, { PersonalEntryBigNumber } from './PersonalEntryNumber';
import { PersonalEntryText, PersonalEntryTextCentered } from './PersonalEntryText';

const Personal = styled.div`
    display: inline-block;
    flex: auto;
    height: auto;
    width: 123mm;
    margin: 5mm 0;
`;

function raceName(race: Race | null, t: TFunction): string {
    if (!race)
        return '';
    const baseName = race.key.split('.', 2)[0];
    return t(`races.${baseName}`);
}

const PersonalBlock: React.FC<CharXpProps> = ({char, xp = 0}) => {
    // TODO: insert values as they become available
    const { t } = useTranslation();
    const label = (key: string): string => t(`ui.personal.${key}`);
    const tlevel = Math.floor(
        (1 + Math.sqrt(1 + 4*xp / 1000)) / 2
    );
    const next = tlevel * (tlevel + 1) * 1000;
    const values = char != null ? {
        charName: char.fullName,
        align: char.personal.align,
        tlevel: tlevel || 0,
        xp: xp || 0,
        next,
        faith: char.personal.faith,
        origin: char.personal.origin,
        race: raceName(char.race, t),
        gender: char.personal.gender,
        age: `${char.personal.age.asFullYears}`,
        height: `${char.personal.height.feetInches}`,
        weight: `${char.personal.weight}`,
        hair: char.personal.hair,
        eyes: char.personal.eyes,
    } : {};
    return (
        <Personal>
            <PersonalEntryText
                id='CharacterName'
                label={label('charName')}
                width={45}
                value={values.charName}/>
            <PersonalEntryText
                id='Alignment'
                label={label('align')}
                width={22}
                value={values.align} />
            <PersonalEntryText
                id='Player'
                label={label('player')}
                width={45} />
            <PersonalEntryNumber
                id='TotalLevel'
                label={label('tLevel')}
                width={12}
                value={values.tlevel} />
            <PersonalEntryBigNumber
                id='Experience'
                label={label('xp')}
                width={17}
                value={values.xp} />
            <PersonalEntryBigNumber
                id='NextLevel'
                label={label('nLevel')}
                width={17}
                value={values.next} />
            <PersonalEntryText
                id='Faith'
                label={label('faith')}
                width={30}
                value={values.faith} />
            <PersonalEntryText
                id='Origin'
                label={label('origin')}
                width={30}
                value={values.origin} />
            <PersonalEntryText
                id='Race'
                label={label('race')}
                width={22}
                value={values.race} />
            <PersonalEntryText
                id='Size'
                label={label('size')}
                width={16} />
            <PersonalEntryText
                id='Gender'
                label={label('gender')}
                width={10}
                value={values.gender} />
            <PersonalEntryTextCentered
                id='Age'
                label={label('age')}
                width={8}
                value={values.age} />
            <PersonalEntryTextCentered
                id='Height'
                label={label('height')}
                width={11}
                value={values.height} />
            <PersonalEntryTextCentered
                id='Weight'
                label={label('weight')}
                width={11}
                value={values.weight} />
            <PersonalEntryText
                id='Hair'
                label={label('hair')}
                width={10}
                value={values.hair} />
            <PersonalEntryText
                id='Eyes'
                label={label('eyes')}
                width={10}
                value={values.eyes} />
        </Personal>
    );
};

export {
    PersonalBlock,
};