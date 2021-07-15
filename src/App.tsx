import { GlobalStyle } from './styles/GlobalStyle';

// import { MainWrapper } from './components/MainWrapper';
import { RewardsTable } from './components/RewardsTable';

import Adventure from './@types/Adventure';
import Faction from './@types/Faction';
import Character from './@types/Character';

const factions = Faction.import('./data/Factions');
const chars = Character.import('./data/Characters');
const adventures = Adventure.import('./data/Adventures');

export function App() {
  return (
    <>
      <GlobalStyle />
      <RewardsTable
        chars={chars}
        factions={Object.values(factions.byKey)}
        data={Adventure.combined(adventures)} />
    </>
  )
}