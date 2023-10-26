const fs = require('fs');
const path = require('path');

function addPropertiesToObject(rootDir, targetObject) {
    const subFolders = fs.readdirSync(rootDir, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
    const files = fs.readdirSync(rootDir, { withFileTypes: true }).filter(dirent => dirent.isFile());

    for (let i = 0; i < subFolders.length; i++) {
        const item = subFolders[i];
        const itemName = item.name;

        if (!targetObject[itemName]) {
            targetObject[itemName] = {};
        }
        addPropertiesToObject(path.join(rootDir, itemName), targetObject[itemName]);
    }

    for (let i = 0; i < files.length; i++) {
        const item = files[i];
        const itemName = item.name;

        const fileName = path.parse(itemName).name;
        targetObject[fileName] = fileName;
    }
}

const baseDir = path.join(path.dirname(process.argv[1]), 'src');
const libDir = baseDir;

const StapleCrypto = {};
addPropertiesToObject(libDir, StapleCrypto);
const libJson = JSON.stringify(StapleCrypto, null, 4);

fs.writeFileSync("libstruct.json", libJson, { encoding: 'utf8' });

process.exit(0);
