import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Character } from '../../../types/Character';
import {
    CastingMode,
    zeroSpellPower,
    zeroCasterLevel,
    levelByMode,
    SubSchool,
    School,
} from '../../../types/Magic';
import Columns from '../../helpers/Columns';
import Header from '../../helpers/Header';
import { reverseColors, debugOutline } from '../../helpers/styles';
import Page from '../../helpers/Page';
import { SpellPower } from './SpellPower';
import { SpellRange } from './SpellRange';
import { SpellSlots } from './SpellSlots';

const ColumnContainer = styled.div`
    & table th {
        text-align: center;
        ${reverseColors}
    }
    & table {
        margin-top: 1em;
        width: 100%;
        ${debugOutline({ color: '#909' })}
    }
`;

export function MagicColumn({
    char,
    mode,
    showTitle = true,
    schoolsFilter,
}: {
    char?: Character;
    mode: CastingMode;
    showTitle?: boolean;
    schoolsFilter?: (School | SubSchool)[];
}): React.JSX.Element {
    const { t } = useTranslation();
    const clevel = levelByMode(char?.casterLevels || zeroCasterLevel, mode);
    const spellPower = (char?.fullSpellPower || zeroSpellPower)[mode];
    return (
        <ColumnContainer>
            {showTitle ? (
                <Header>{t(`magic.modes.full.${mode}`)}</Header>
            ) : (
                <></>
            )}
            <SpellSlots char={char} mode={mode} />
            <SpellRange efl={clevel} mode={mode} />
            <SpellPower
                data={spellPower}
                mode={mode}
                schoolsFilter={schoolsFilter}
            />
        </ColumnContainer>
    );
}

export function MagicPage({
    char,
    visible = true,
}: {
    char?: Character;
    visible?: boolean;
}): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <Page key="Magic" id="Magic" visible={visible}>
            <Header>{t('charsheet.magic.h')}</Header>
            <Columns
                columns={[
                    {
                        key: 'Arcane',
                        id: 'Arcane',
                        children: (
                            <MagicColumn
                                char={char}
                                mode={CastingMode.arcane}
                            />
                        ),
                    },
                    {
                        key: 'Divine',
                        id: 'Divine',
                        children: (
                            <MagicColumn
                                char={char}
                                mode={CastingMode.divine}
                            />
                        ),
                    },
                    {
                        key: 'Spontaneous',
                        id: 'Spontaneous',
                        children: (
                            <MagicColumn
                                char={char}
                                mode={CastingMode.spontaneous}
                            />
                        ),
                    },
                ]}
            />
        </Page>
    );
}
