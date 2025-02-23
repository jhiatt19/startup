import React, { useEffect, useState, useRef } from 'react';
import './Pdfextractor.css';

import { BuiltScript, ScriptBuilder } from './scriptBuilder';

export function PDFextractor() {
  const [message, setMessage] = useState("Extract Text");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const fileInputRef = useRef(null);
  const optionInputRef = useRef(null);
  const [test, setTest] = useState('')

  const handleFileInput = () => {
    if (fileInputRef.current && fileInputRef.current.files.length > 0){
      setSelectedFile(fileInputRef.current.files[0].name);
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
    new ScriptBuilder(selectedFile, selectedOption)
    //This will be a 3rd party call to a python script I have already written.
    let testing =  localStorage.getItem("textString");
    setTest(JSON.parse(testing));
  };
  return (
    <main>
        <h2>PDF extractor</h2> {/*I have created a script for this already so this will have a 3rd party call to get to the Tesseract OCR open source code, but the actual script will be locally hosted*/}
            <section>
                <form id="extractorStuff" action="PDFextractor.html" onSubmit={handleSubmit}>
                  <div>
                    <label className="extractor" htmlFor="pdfFile">Choose PDF to extract text from</label>
                    <input ref={fileInputRef} type="file" id="pdfFile" onChange={handleFileInput} required/>
                    {selectedFile && <p>Selected File: {selectedFile}</p>}
                  </div>
                  <div>
                    <label className="fileTypeSelector" htmlFor="fileType">What kind of file would you like text added to?</label>
                    <select ref={optionInputRef} value={selectedOption} id="fileType" name="fileType" onChange={handleSelector}>
                        <option>Select a output file type</option>
                        <option>txt</option>
                        <option>pdf</option>
                        <option>html</option>
                        <option>tsv</option>
                    </select>
                    <p>The pdf option returns a searchable pdf and the html returns a hOCR file.</p>
                    </div>
                    <input type='submit' value={message} className="extractor" id="extractInput"/>
                </form>
                <div>
                  <p>{test}</p>
                </div>
            </section>
    </main>
  );
}