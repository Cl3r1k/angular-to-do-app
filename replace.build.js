var replace = require('replace-in-file');
var package = require("./package.json");
var buildVersion = package.version;
const options = {
    files: 'src/environments/environment.prod.ts',
    from: /version: '(.*)'/g,
    to: "version: '" + buildVersion + "'",
    allowEmptyPaths: true
        // from: /{BUILD_VERSION}/,
        // to: buildVersion
};

try {

    let buildVer = /\d+$/.exec(package.version);

    if (buildVer.length > 0) {
        console.log('package version is: ' + buildVer[0]);
    }

    let changedFiles = replace.sync(options);

    if (changedFiles.length === 0) {
        throw "Please make sure that file '" + options.files + "' has \"version: ''\"";
    }

    console.log('Build version set: ' + buildVersion);
} catch (error) {
    console.error('Error occured: ', error);
    throw error;
}

// TODO: Take version from package.json and environment.prod.ts update build from env.prod and combine with version