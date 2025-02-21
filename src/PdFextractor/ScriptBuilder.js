 let BuiltScript = {
     scriptLanguage: 'Python',
     InputFilePath: 'inputfile',
     OutputFilePath: 'outputfile',
     scriptName: 'scriptname',
};

class ScriptBuilder {
    scriptName = "Pdf-splitter.py";
    constructor(InputFilePath,OutputFilePath) {
        this.buildScript(this.scriptName,InputFilePath,OutputFilePath);
        return this.runScript(JSON.parse(localStorage.getItem('myKey')));
    }

    buildScript(scriptName,inPath,outPath){
        BuiltScript = {scriptLanguage: "Python", InputFilePath: inPath, OutputFilePath: outPath, scriptName: scriptName};
        localStorage.setItem('myKey',JSON.stringify(BuiltScript));
    }

    runScript(command) {
        //Run back end service that runs the pdf-splitter script
        console.log(command);
    }
}

export {BuiltScript,ScriptBuilder}