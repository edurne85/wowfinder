import React from 'react';

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
};

export const GlobalContext = React.createContext(defaultContext);