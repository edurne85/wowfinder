import { FullData } from '../../types/FullData';
import React from 'react';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [];

const data = FullData.load();

const defaultContext = {
    forceBlank: false,
    forcePages: {
        magic: false,
        spells: false,
        feral: false,
        moonkin: false,
        tree: false,
        travel: false,
    },
    data,
    routes,
};

export const GlobalContext = React.createContext(defaultContext);
