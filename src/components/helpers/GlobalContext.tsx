import { FullData } from '../../types/FullData';
import React from 'react';
import { RouteObject, createHashRouter } from 'react-router-dom';

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

export { GlobalContext, GlobalContextType };
