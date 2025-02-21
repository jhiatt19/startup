import React from 'react';
import './Pdfextractor.css';

import { BuiltScript, ScriptBuilder } from './scriptBuilder';

export function PDFextractor() {
  const inputFile = document.getElementById("pdfFile");
  const outputFile = document.getElementById("fileType");
  return (
    <main>
        <h2>PDF extractor</h2> {/*I have created a script for this already so this will have a 3rd party call to get to the Tesseract OCR open source code, but the actual script will be locally hosted*/}
            <section>
                <form id="extractorStuff" action="PDFextractor.html">
                    <label className="extractor" htmlFor="pdfFile">Choose PDF to extract text from</label>
                    <input type="file" id="pdfFile"/>
                    <label className="fileTypeSelector" htmlFor="fileType">What kind of file would you like text added to?</label>
                    <select id="fileType" name="fileType">
                        <option value="txt">.txt</option>
                        <option value="searchAblePDF">Searchable PDF</option>
                        <option value="html">HTML (hOCR)</option>
                        <option value="TSV">TSV</option>
                    </select>
                    <input id="extractInput" value="Extract text" onClick={() => new ScriptBuilder(inputFile,outputFile)}/>
                </form>
            </section>
    </main>
  );
}