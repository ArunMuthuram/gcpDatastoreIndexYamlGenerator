const { spawnSync } = require("child_process");
const ENUMS = require("../enums/enums");
const { isValidString } = require("./validator");

function setGcloudProject(gcpProjectID){
    if(!isValidString(gcpProjectID)){
        throw new Error('Please enter a valid GCP projectID. Syntax: node index.js gcpProjectID');
    }
    spawnSync(`${ENUMS.GCLOUD}`,["config","set","project",gcpProjectID],{ encoding: 'utf-8' });
}

function getGcloudDatastoreIndexesText(){
    const result = spawnSync(`${ENUMS.GCLOUD}`,["datastore","indexes","list"],{ encoding: 'utf-8' });
    return result.stdout;
}

module.exports = { setGcloudProject, getGcloudDatastoreIndexesText }