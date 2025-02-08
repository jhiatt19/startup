import React from 'react';
import './Pdfextractor.css';

export function PDFextractor() {
  return (
    <main>
        <h2>PDF extractor</h2> {/*I have created a script for this already so this will have a 3rd party call to get to the Tesseract OCR open source code, but the actual script will be locally hosted*/}
            <section>
                <form id="extractorStuff" action="PDFextractor.html">
                    <label class="extractor" for="pdfFile">Choose PDF to extract text from</label>
                    <input type="file" id="pdfFile"/>
                    <label class="fileTypeSelector" for="fileType">What kind of file would you like text added to?</label>
                    <select id="fileType" name="fileType">
                        <option value="txt">.txt</option>
                        <option value="searchAblePDF">Searchable PDF</option>
                        <option value="html">HTML (hOCR)</option>
                        <option value="TSV">TSV</option>
                    </select>
                    <input id="extractInput" type="submit" value="Extract text"/>
                </form>
            </section>
    </main>
  );
}