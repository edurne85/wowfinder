import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Home(): JSX.Element {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t('home.title')}</h1>
            <h2>
                <Link to="/factions">{t('home.menu.factions')}</Link>
            </h2>
            <h2>
                <Link to="/chars">{t('home.menu.chars')}</Link>
            </h2>
            <h2>
                <Link to="/spells">{t('home.menu.spells')}</Link>
            </h2>
            <h2>
                <Link to="/classes">{t('home.menu.classes')}</Link>
            </h2>
            <h2>
                <Link to="/races">{t('home.menu.races')}</Link>
            </h2>
            <h2>
                <Link to="/items">{t('home.menu.items')}</Link>
            </h2>
            <h2>
                <Link to="/export">{t('home.menu.export')}</Link>
            </h2>
        </div>
    );
}

export { Home };
