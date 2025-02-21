import React, { useState, useRef } from 'react';
import './Pdfextractor.css';

import { BuiltScript, ScriptBuilder } from './scriptBuilder';

export function PDFextractor() {
  const [message, setMessage] = useState("Extract Text");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const fileInputRef = useRef(null);
  const optionInputRef = useRef(null);

  const handleFileInput = () => {
    if (fileInputRef.current && fileInputRef.current.files.length > 0){
      setSelectedFile(fileInputRef.current.files[0]);
    }
    else {
      setSelectedFile(null);
    }
  };

  const handleSelector = () => {
    if (optionInputRef.current){
      setSelectedOption(optionInputRef.current.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formInfo = new FormData();
    formInfo.append('file',selectedFile.name);
    formInfo.append('outType',selectedOption);

    formInfo.forEach(element => {
      console.log(element);
    });
    const test = new ScriptBuilder(formInfo['file'],formInfo['outType']);
  }
  return (
    <main>
        <h2>PDF extractor</h2> {/*I have created a script for this already so this will have a 3rd party call to get to the Tesseract OCR open source code, but the actual script will be locally hosted*/}
            <section>
                <form id="extractorStuff" action="PDFextractor.html" onSubmit={handleSubmit}>
                  <div>
                    <label className="extractor" htmlFor="pdfFile">Choose PDF to extract text from</label>
                    <input ref={fileInputRef} type="file" id="pdfFile" onChange={handleFileInput}/>
                    {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                  </div>
                  <div>
                    <label className="fileTypeSelector" htmlFor="fileType">What kind of file would you like text added to?</label>
                    <select ref={optionInputRef} value={selectedOption} id="fileType" name="fileType" onChange={handleSelector}>
                        <option>Select a output file type</option>
                        <option>.txt</option>
                        <option>Searchable PDF</option>
                        <option>HTML (hOCR)</option>
                        <option>.tsv</option>
                    </select>
                    </div>
                    <input type='submit' value={message} className="extractor" id="extractInput"/>
                </form>
            </section>
    </main>
  );
}