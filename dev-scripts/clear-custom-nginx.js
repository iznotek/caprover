/*jshint esversion: 6 */

const fs = require('fs-extra');
const CAPTAIN_ROOT = process.platform == 'darwin' ? '/var/captain' : '/captain'
const CONFIG_FILE_PATH = `${CAPTAIN_ROOT}/data/config-captain.json`;

const fileContent = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, {
    encoding: 'utf-8'
}));

fs.writeFileSync(CONFIG_FILE_PATH + '.backup', JSON.stringify(fileContent));


fileContent.nginxBaseConfig = '';
fileContent.nginxCaptainConfig = '';

const apps = fileContent.appDefinitions || {};

Object.keys(apps).forEach(app => {
    apps[app].customNginxConfig = '';
});

fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(fileContent));