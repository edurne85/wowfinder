import { FullData } from '../../types/FullData';
import { CharacterSelection } from './CharacterSelection';
import { onSelectionHandler } from './helpers';

interface ExportByCharacterSelectionProps {
    data: FullData;
}

function ExportByCharacterSelection({
    data,
}: ExportByCharacterSelectionProps): React.JSX.Element {
    return (
        <CharacterSelection
            chars={Object.values(data.chars)}
            onCharactersSelected={onSelectionHandler(data)}
        />
    );
}

export { ExportByCharacterSelection };
