import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Character } from '../../../types/Character';
import { mapLines } from '../../helpers/FillableLine';

const maxLines = 30;

const TraitsContainer = styled.div`
    margin-top: 2.8ex;
`;

function classFeatureString(translated: string, count: number): string {
    return count > 1 ? `${translated} (${count})` : translated;
}
function classFeatureStrings(
    char: Character,
    t: (key: string) => string,
): string[] {
    return char.classFeaturesCondensed.list.map(({ feature, count }) =>
        classFeatureString(t(`class.features.${feature}`), count),
    );
}

export default function Traits({
    char,
}: {
    char?: Character;
}): React.JSX.Element {
    const { t } = useTranslation();
    const lines: string[] = [];
    // TODO #457: Racial traits
    lines.push(...(char ? classFeatureStrings(char, t) : []));
    lines.push(...(char?.validFeats || []));
    lines.splice(maxLines);
    lines.push(...Array(maxLines - lines.length));
    return <TraitsContainer>{mapLines(lines, 'TraitsLine-')}</TraitsContainer>;
}
