import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Character } from '../../types/Character';

const CharacterSelectionContainer = styled.div`
    fieldset label {
        display: block;
    }
`;

type OnCharactersSelected = (
    ok: boolean,
    charKeys: string[]
) => boolean;

interface CharacterSelectionProps {
    chars: Character[];
    onCharactersSelected: OnCharactersSelected;
}

function getCharacterSelection(): string[] {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
        '#exportCharacterSelection input[type=checkbox]'
    );
    const selectedChars = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    return selectedChars;
}

function CharacterSelection({
    chars,
    onCharactersSelected,
}: CharacterSelectionProps): JSX.Element {
    const { t } = useTranslation();
    return (
        <CharacterSelectionContainer>
            <fieldset id="exportCharacterSelection">
                {chars.map(char => (
                    <label key={char.key}>
                        <input type="checkbox" value={char.key} />
                        {char.fullName}
                    </label>
                ))}
            </fieldset>
            <button onClick={() => onCharactersSelected(false, [])}>
                {t('buttons.cancel')}
            </button>
            <button
                onClick={() =>
                    onCharactersSelected(true, getCharacterSelection())
                }
            >
                {t('buttons.ok')}
            </button>
        </CharacterSelectionContainer>
    );
}

export type { OnCharactersSelected, CharacterSelectionProps };
export { CharacterSelection };
