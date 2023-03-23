import { FullData } from '../FullData';
import { RouteObject } from 'react-router-dom';

type RouteProvider = (data: FullData) => RouteObject[];

function WiP (): JSX.Element {
    console.log({route: window.location.hash.replace(/^#/, '')});
    return <div>Work in progress</div>;
}

export { WiP };

export type { RouteProvider };
