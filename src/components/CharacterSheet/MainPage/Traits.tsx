import { TFunction, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Character } from '../../../@types/Character';
import { mapLines } from '../../helpers/FillableLine';

const maxLines = 32;

const TraitsContainer = styled.div`
    margin-top: 2.8ex;
`;

function classFeatureString(translated: string, count: number): string {
    return count > 1 ? `${translated} (${count})` : translated;
}
function classFeatureStrings(char: Character, t: TFunction<'translation'>): string[] {
    return char.classFeaturesCondensed.map(({feature, count}) => classFeatureString(t(`classFeatures.${feature}`), count));
}

export default function Traits({char}: {char?: Character}): JSX.Element {
    const { t } = useTranslation();
    const lines: string[] = [];
    // TODO Racial traits
    lines.push(...(char ? classFeatureStrings(char, t) : []));
    lines.push(...(char?.validFeats || []));
    // TODO: feats
    lines.splice(maxLines);
    lines.push(...Array(maxLines - lines.length));
    return (<TraitsContainer>
        {mapLines(lines, 'TraitsLine-')}
    </TraitsContainer>);
}