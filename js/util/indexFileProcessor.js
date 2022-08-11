const { spawnSync } = require("child_process");
const ENUMS = require("../enums/enums");
const {isValidString} = require('./validator');

function cleanIndexYamlFile(){
    spawnSync('rm',[ENUMS.OUTPUT_FILE_PATH]);
}

function generateIndexYamlContent(rawContent){
    cleanIndexYamlFile();
    let indexYamlContent = initFileContent();
    const indexes = rawContent.split(ENUMS.INDEX_SEPARATOR);
    for(let index of indexes){
        indexYamlContent = indexYamlContent.concat(generateSingleIndexContent(index));
    }
    return indexYamlContent;
}

function generateSingleIndexContent(index){
    if(!isValidString(index)){
        return "";
    }
    const indexLines = index.split("\n");
    let indexContent = generateKindText(indexLines[3]);
    indexContent = indexContent.concat(generateAncestorText(indexLines[1]));
    indexContent = indexContent.concat(generatePropertiesText(indexLines.splice(6, indexLines.length-8)));
    return "\n".concat(indexContent);
}

function generateKindText(kindText){
    return `- ${kindText}\n`;
}

function generateAncestorText(ancestorText){
    const ancestorValue = ancestorText.split(" ")[1];
    if(ancestorValue === "NONE"){
        return "";
    }else{
        return "  ancestor: yes";
    }
}

function generatePropertiesText(properties){
    let propertiesContent = "  properties:\n";
    for(let i=0; i<properties.length; i++){
        if(isTextPropertyKind(properties[i])){
            propertiesContent = propertiesContent.concat(generatePropertyKindText(properties[i]));
            if(i-1 >= 0 && isTextPropertyDirection(properties[i-1])){
                propertiesContent = propertiesContent.concat(generatePropertiesDirectionText(properties[i-1]));
            }
        }
    }
    return propertiesContent;
}

function isTextPropertyKind(text){
    return isValidString(text) && text.includes("name:");
}

function isTextPropertyDirection(text){
    return isValidString(text) && text.includes("direction:");
}

function generatePropertyKindText(propertyKindText){
    return `  - ${propertyKindText.trim()}\n`;
}

function generatePropertiesDirectionText(directionText){
    const direction = directionText.includes("ASCENDING") ? "asc" : "desc";
    return `    direction: ${direction}\n`;
}

function initFileContent(){
    return "indexes:\n";
}

module.exports = { generateIndexYamlContent }