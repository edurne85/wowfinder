import { FullData } from '../../types/FullData';
import { debugOutput, exportByCharsAsJsonAssets } from '../../utils';
import { OnCharactersSelected } from './CharacterSelection';

function onSelectionHandler(data: FullData): OnCharactersSelected {
    return (ok, charKeys): boolean => {
        debugOutput('OnCharactersSelected', { ok, charKeys });
        let result = false;
        if (ok) {
            result = window.Files.saveToZip(
                exportByCharsAsJsonAssets(data, ...charKeys),
                'export.zip',
            );
        }
        window.history.back();
        return result;
    };
}

export { onSelectionHandler };
