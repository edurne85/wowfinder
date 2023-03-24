import { RouteProvider, WiP } from './base';
import { Link } from 'react-router-dom';
import Race from '../@types/Character/Race';
import { useTranslation } from 'react-i18next';

interface RaceListProps {
  races: { [key: string]: Race };
}

function RaceList({races}: RaceListProps): JSX.Element {
  const classKeys = Object.keys(races).sort();
  const { t } = useTranslation();
  return (
    <div>
      {classKeys.map(key => (
        <p key={key}>
          <Link to={`/races/:${key}`}>{t(`races.${key}`)}</Link>
        </p>
      ))}
    </div>
  );
}

const raceRoutes: RouteProvider = data => {
    return [
        {
            path: '/races',
            element: <RaceList races={data.races} />,
        },
        {
            path: '/races/:race',
            element: <WiP />,
        }
    ];
};

export { raceRoutes };