const { isValidString } = require("./validator");
const ENUMS = require('../enums/enums');
const fs = require('fs');

function writeToIndexYamlFile(content){
    if(!isValidString(content)){
        throw new Error("Index yaml content empty!");
    }
    writeContentToFile(content, ENUMS.OUTPUT_FILE_PATH);
}
function writeContentToFile(content, filePath){
    if(isValidString(content) && isValidString(filePath)){
        fs.writeFileSync(filePath,content);
    }else{
        throw new Error("Invalid file or content!");
    }
}

module.exports = { writeToIndexYamlFile }