import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Race from "../../../../@types/Character/Race";
import { CharXpProps } from "../../base";
import { PersonalEntryText, PersonalEntryTextCentered } from "./PersonalEntryText";

const Personal = styled.div`
    display: inline-block;
    flex: auto;
    height: auto;
    width: 123mm;
    margin: 10mm 0;
`;

function raceName(race: Race | null, t: TFunction) {
    if (!race)
        return '';
    const baseName = race.key.split('.', 2)[0];
    return t(`races.${baseName}`);
}

const PersonalBlock: React.FC<CharXpProps> = ({char, xp}) => {
    // TODO: insert values as they become available
    const { t } = useTranslation();
    const label = (key: string): string => t(`ui.charsheet.h.personal.${key}`);
    const tlevel = Math.floor(
        (1 + Math.sqrt(1 + 4*xp / 1000)) / 2
    );
    const next = tlevel * (tlevel + 1) * 1000;
    return (
        <Personal>
            <PersonalEntryText
                id='CharacterName'
                label={label('charName')}
                width={45}
                value={char.fullName}/>
            <PersonalEntryText
                id='Alignment'
                label={label('align')}
                width={22}
                value={char.personal.align} />
            <PersonalEntryText
                id='Player'
                label={label('player')}
                width={45} />
            <PersonalEntryText
                id='TotalLevel'
                label={label('tLevel')}
                width={12}
                value={tlevel.toString()} />
            <PersonalEntryText
                id='Experience'
                label={label('xp')}
                width={17}
                value={xp.toString()} />
            <PersonalEntryText
                id='NextLevel'
                label={label('nLevel')}
                width={17}
                value={next.toString()} />
            <PersonalEntryText
                id='Faith'
                label={label('faith')}
                width={30}
                value={char.personal.faith} />
            <PersonalEntryText
                id='Origin'
                label={label('origin')}
                width={30}
                value={char.personal.origin} />
            <PersonalEntryText
                id='Race'
                label={label('race')}
                width={22}
                value={raceName(char.race, t)} />
            <PersonalEntryText
                id='Size'
                label={label('size')}
                width={16} />
            <PersonalEntryText
                id='Gender'
                label={label('gender')}
                width={10}
                value={char.personal.gender} />
            <PersonalEntryTextCentered
                id='Age'
                label={label('age')}
                width={8}
                value={`${char.personal.age.asFullYears}`} />
            <PersonalEntryTextCentered
                id='Height'
                label={label('height')}
                width={11}
                value={`${char.personal.height.feetInches}`} />
            <PersonalEntryTextCentered
                id='Weight'
                label={label('weight')}
                width={11}
                value={`${char.personal.weight}`} />
            <PersonalEntryText
                id='Hair'
                label={label('hair')}
                width={10}
                value={char.personal.hair} />
            <PersonalEntryText
                id='Eyes'
                label={label('eyes')}
                width={10}
                value={char.personal.eyes} />
        </Personal>
    );
};

export {
    PersonalBlock,
}