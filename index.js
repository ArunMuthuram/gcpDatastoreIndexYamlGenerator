const {setGcloudProject,getGcloudDatastoreIndexesText} = require("./js/util/gcloudUtil");
const { generateIndexYamlContent } = require("./js/util/indexFileProcessor");
const { writeToIndexYamlFile } = require("./js/util/fileOutputProcessor");
const gcpProjectID = process.argv[2];

(function(){
    try{
        setGcloudProject(gcpProjectID);
        const indexRawContent = getGcloudDatastoreIndexesText();
        const indexYamlContent = generateIndexYamlContent(indexRawContent);
        writeToIndexYamlFile(indexYamlContent);
        console.log("index.yaml file successfully generated under output folder.")
    }catch(e){
        console.error(e.message);
    }
})();