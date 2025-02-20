const BuiltScript = {
    scriptLanguage: 'Python',
    InputFilePath: 'inputfile',
    OutputFilePath: 'outputfile',
    scriptName: 'scriptname',
};

class ScriptBuilder {
    scriptName = "Pdf-splitter.py";
    constructor(InputFilePath,OutputFilePath) {
        const commandLine = new buildScript(this.scriptName,InputFilePath,OutputFilePath);

    }

    buildScript(scriptName,inPath,outPath){
        return BuiltScript = {scriptLanguage: "Python", InputFilePath: inPath, OutputFilePath: outPath, scriptName: scriptName};
    }

    runScript(command) {
        //Run back end service that runs the pdf-splitter script
        console.log(command);
    }
}