import { useTranslation } from 'react-i18next';
import { SpellList } from '../../types/Magic';
import { Link } from 'react-router-dom';

interface SpellListsViewProps {
    lists: SpellList[];
}

function SpellListsView({ lists }: SpellListsViewProps): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <>
            {lists.map(list => (
                <h2 key={list.key}>
                    <Link to={`/spells/${list.key}`}>
                        {t(`spells.lists.${list.key}`)}
                    </Link>
                </h2>
            ))}
        </>
    );
}

export { SpellListsView };
