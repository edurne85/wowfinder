import { GlobalStyle } from './styles/GlobalStyle';

import { RewardsTable } from './components/RewardsTable';

import Adventure from './@types/Adventure';
import Faction from './@types/Faction';
import Character from './@types/Character';

const factions = Faction.import();
const chars = Character.import();
const adventures = Adventure.import();

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