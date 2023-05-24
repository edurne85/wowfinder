module.exports = {
    packagerConfig: {
        name: 'WowFinder Companion',
        executableName: 'wowfinder-companion',
        icon: 'assets/icon',
        extraResource: ['assets', 'translations'],
    },
    plugins: [
        {
            name: '@electron-forge/plugin-webpack',
            config: {
                mainConfig: './webpack/main.webpack.js',
                renderer: {
                    config: './webpack/renderer.webpack.js',
                    entryPoints: [
                        {
                            main: '.webpack/main',
                            html: './public/index.html',
                            js: './src/index.tsx',
                            name: 'main_window',
                            preload: {
                                js: './electron/bridge.ts',
                            },
                        },
                    ],
                },
            },
        },
    ],
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'ElectronStarter',
            },
        },
        {
            name: '@electron-forge/maker-zip',
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
        {
            name: '@electron-forge/maker-dmg',
        },
    ],
};
