 let BuiltScript = {
     scriptLanguage: 'Python',
     InputFilePath: 'inputfile',
     OutputFilePath: 'outputfile',
     scriptName: 'scriptname',
};
// let dataFile;
// let data;

class ScriptBuilder {
    scriptName = "Pdf-splitter.py";
    // dataFile = localStorage.getItem("myFile");
    constructor(input, output) {
        let outputPath = input.slice(0,-3) + output;
        let newScript = this.buildScript(this.scriptName,input,outputPath);
        this.runScript(newScript);
        // if (dataFile){
        //     try {
        //         data = JSON.parse(dataFile);
        //         let inputPath = data.input
        //         let outputPath = inputPath + data.outputPath;
        //         let newScript = this.buildScript(this.scriptName,inputPath,outputPath);
        //         this.runScript(newScript);
        //     }
        //     catch (error){
        //         console.error("Error parsing: ", error);
        //     }
            
        // }
        // else {
        //     console.log("No data");
        }

    removeLastChars(){
        setSelectedFile(selectedFile.slice(0,-3));
      }
    buildScript(scriptName,inPath,outPath){
        BuiltScript = {scriptLanguage: "Python", InputFilePath: inPath, OutputFilePath:outPath, scriptName: scriptName};
        return BuiltScript;
    }

    runScript(command) {
        //Run back end service that runs the pdf-splitter script
        console.log(command.OutputFilePath);
        localStorage.setItem("textString",JSON.stringify(command.OutputFilePath));
    }
}
export {BuiltScript,ScriptBuilder}