import type { StatsBonusViewArgs } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StatsBonusView({ statsBonus }: StatsBonusViewArgs): React.JSX.Element {
    return <p>Not implemented!</p>;
}

function ConditionalStatsBonusView({
    statsBonus,
}: Partial<StatsBonusViewArgs>): React.JSX.Element {
    return statsBonus ? <StatsBonusView statsBonus={statsBonus} /> : <></>;
}

export { StatsBonusView, ConditionalStatsBonusView, StatsBonusViewArgs };
