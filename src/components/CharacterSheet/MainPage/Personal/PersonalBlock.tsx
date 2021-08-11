import styled from "styled-components";
import { CharProps } from "../../base";
import { PersonalEntryText, PersonalEntryTextCentered } from "./PersonalEntryText";

const Personal = styled.div`
    display: inline-block;
    flex: auto;
    height: auto;
    width: 123mm;
    margin: 10mm 0;
`;

const PersonalBlock: React.FC<CharProps> = ({char}) => {
    // TODO: insert values as they become available
    return (
        <Personal>
            <PersonalEntryText
                id='CharacterName'
                label='Nombre del personaje'
                width={45}
                value={char.fullName}/>
            <PersonalEntryText
                id='Alignment'
                label='Alineamiento'
                width={22}
                value={char.personal.align} />
            <PersonalEntryText
                id='Player'
                label='Jugador'
                width={45} />
            <PersonalEntryText
                id='TotalLevel'
                label='Nivel total'
                width={12} />
            <PersonalEntryText
                id='Experience'
                label='Experiencia'
                width={17} />
            <PersonalEntryText
                id='NextLevel'
                label='Siguiente nivel'
                width={17} />
            <PersonalEntryText
                id='Faith'
                label='Fe / Deidad'
                width={30}
                value={char.personal.faith} />
            <PersonalEntryText
                id='Origin'
                label='Origen'
                width={30}
                value={char.personal.origin} />
            <PersonalEntryText
                id='Race'
                label='Raza'
                width={22} />
            <PersonalEntryText
                id='Size'
                label='Tamaño'
                width={16} />
            <PersonalEntryText
                id='Gender'
                label='Género'
                width={10}
                value={char.personal.gender} />
            <PersonalEntryTextCentered
                id='Age'
                label='Edad'
                width={8}
                value={`${char.personal.age.asFullYears}`} />
            <PersonalEntryTextCentered
                id='Height'
                label='Altura'
                width={11}
                value={`${char.personal.height.feetInches}`} />
            <PersonalEntryTextCentered
                id='Weight'
                label='Peso'
                width={11}
                value={`${char.personal.weight}`} />
            <PersonalEntryText
                id='Hair'
                label='Pelo'
                width={10}
                value={char.personal.hair} />
            <PersonalEntryText
                id='Eyes'
                label='Ojos'
                width={10}
                value={char.personal.eyes} />
        </Personal>
    );
};

export {
    PersonalBlock,
}