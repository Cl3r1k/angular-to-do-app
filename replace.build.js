// DESCRIPTION: Take current version from package.json and environment.prod.ts update build from env.prod and combine with version from package.json

var replace = require('replace-in-file');
var package = require("./package.json");
var buildVersion = package.version;
let totalBuildVer;
var fs = require("fs"); // To read file from FS
const options = {
    files: 'src/environments/environment.prod.ts',
    from: /version: '(.*)'/g,
    // to: "version: '" + totalBuildVer + "'", // Will be updated later
    allowEmptyPaths: true
};

try {

    let buildInfo = 0;

    fs.readFile("src/environments/environment.prod.ts", 'utf-8', function(error, data) {

        if (error === null) {
            let versionInfo = /version: '(.*)'/.exec(data); // Extract `version: '0.0.0.0'` from file

            if (versionInfo.length > 0) {
                buildInfo = /\d+(?=')/.exec(versionInfo[0]); // RegExp to take the last numbers in the ver info https://regex101.com/r/eJBi3b/1
                buildInfo[0]++;
            }
        } else {
            buildInfo = 0;
            console.error('error: ', error);
        }

        totalBuildVer = package.version + '.' + buildInfo;

        options.to = "version: '" + totalBuildVer + "'"; // Update version in options object

        let changedFiles = replace.sync(options);

        if (changedFiles.length === 0) {
            throw "Please make sure that file '" + options.files + "' has \"version: ''\"";
        }

        console.log('Build version set to: ' + totalBuildVer);
    });
} catch (error) {
    console.error('Error occured: ', error);
    throw error;
}