import { GlobalStyle } from './styles/GlobalStyle';

import { CharacterList } from './components/CharacterList';
import { RewardsTable } from './components/RewardsTable';

import Adventure from './@types/Adventure';
import Faction, { Reputation } from './@types/Faction';
import Character from './@types/Character';
import Class from './@types/Character/Class';
import './i18n';
import { useTranslation } from "react-i18next";

const factions = Faction.import();
const chars = Character.import();
const adventures = Adventure.import();
const rewards = Adventure.combined(adventures);
const classes = Class.import();
console.log({factions, chars, adventures, rewards, classes});

function Rep(r: string) {
  const { t } = useTranslation();
  return (<li>{t(`reputation.${r}`)}</li>);
}
function Reputations() {
  return(<ul>
    {Object.keys(Reputation).map(Rep)}
  </ul>);
}

function RewTable() {
  return (<RewardsTable
    chars={chars}
    factions={Object.values(factions.byKey)}
    data={rewards} />);
}
function CharList() {
  return (<CharacterList
    chars={chars}
    rewards={rewards}
    />);
}

export function App() {
  return (
    <>
      <GlobalStyle />
      <RewTable />
    </>
  )
}