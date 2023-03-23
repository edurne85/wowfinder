import { Link } from 'react-router-dom';

// TODO: i18n
function Home(): JSX.Element {
    return (
        <div>
            <h1>WowFinder</h1>
            <h2><Link to="/factions">Factions and Rewards</Link></h2>
            <h2><Link to="/chars">Characters</Link></h2>
            <h2><Link to="/spells">Spell lists</Link></h2>
            <h2><Link to="/classes">Classes</Link></h2>
            <h2><Link to="/races">Races</Link></h2>
            <h2><Link to="/items">Items</Link></h2>
        </div>
    );
}

export { Home };
