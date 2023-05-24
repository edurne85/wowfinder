import { FullData } from '../../types/FullData';
import React from 'react';
import { RouteObject, createHashRouter } from 'react-router-dom';
import { assertDefined } from '../../utils';

type GlobalContextType = {
    forceBlank: boolean;
    forcePages: {
        magic: boolean;
        spells: boolean;
        feral: boolean;
        moonkin: boolean;
        tree: boolean;
        travel: boolean;
    };
    data?: FullData;
    routes: RouteObject[];
    router: ReturnType<typeof createHashRouter> | null;
};

const defaultContext: GlobalContextType = {
    forceBlank: false,
    forcePages: {
        magic: false,
        spells: false,
        feral: false,
        moonkin: false,
        tree: false,
        travel: false,
    },
    routes: [],
    router: null,
};

const GlobalContext = React.createContext(defaultContext);

function useData(): FullData {
    const context = React.useContext(GlobalContext);
    assertDefined(context.data);
    return context.data;
}

export { GlobalContext, GlobalContextType, useData };
