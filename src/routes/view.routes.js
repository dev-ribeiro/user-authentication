const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const publicFolderPath = path.join(__dirname, '../views');

router.get('/', express.static(publicFolderPath));

function hasIndexFile(directoryPath) {
    const indexFilePath = path.join(directoryPath, 'index.html');
    return fs.existsSync(indexFilePath);
}

const directories = fs.readdirSync(publicFolderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

directories.forEach(directory => {
    const directoryPath = path.join(publicFolderPath, directory);

    if (hasIndexFile(directoryPath)) {
        router.get(`/${directory}`, (req, res) => {
            res.sendFile(path.join(directoryPath, 'index.html'));
        });
    }

    router.use(`/${directory}`, express.static(directoryPath));
});

module.exports = router;

