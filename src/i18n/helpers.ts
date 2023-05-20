function baseName(path: string): string {
    path = path.replace(/\\/g, '/');
    let base: string = path.substring(path.lastIndexOf('/') + 1);
    if (base.lastIndexOf('.') !== -1)
        base = base.substring(0, base.lastIndexOf('.'));
    return base;
}

function filesAndDirs(basePath: string): string[] {
    return [
        ...window.Files.getFiles(basePath, 'i18n'),
        ...window.Files.getDirectories(basePath),
    ];
}

export { baseName, filesAndDirs };
