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
                            html: './src/index.html',
                            js: './src/renderer.tsx',
                            name: 'main_window',
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
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
};

