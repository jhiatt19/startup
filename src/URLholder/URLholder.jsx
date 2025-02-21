import React, {useState, useRef} from 'react';
import './urlHolder.css';

export function URLholder() {
    const [url, setUrl] = useState('https://');
    const[description, setDescription] = useState('Optional Description');
    const urlRef = useRef(null);
    const descriptionRef = useRef(null);
    
    const handleDescription = () => {
        if (handleDescription.current){
            setDescription(descriptionRef.current.value);
        }
    };

    const handleUrl = () => {
        if (urlRef.current){
            setUrl(urlRef.current.value);
        }
    };

    const handleSubmit = () => {
        const urlInfo = new FormData();
        urlInfo.append('url', url);
        urlInfo.append('description', description);
    };
  return (
    <main>
        <h3>URL Holder</h3>
            <section>
                <img src="https://cdn.prod.website-files.com/5efa7dedd66555c407f7e6c4/6011b1a6692592dccf6e91b1_A%20mess%20of%20tab%20-%20having%20too%20many%20tabs%20open%20is%20killing%20your%20productivity.png"/>
                <form id="websiteSubmit" onSubmit={handleSubmit}>
                    <label htmlFor="website">Add URL:</label>
                    <input type="url" className="website" id="website" value={url} ref={urlRef} onChange={handleUrl} required/>
                    <input type="text" className="website" id="description" value={description} ref={descriptionRef} onChange={handleDescription}/>
                    <button id="bigButton" type="submit">Submit</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th id="topRow" colSpan="2">Saved URL's</th>
                        </tr>
                        <tr>
                            <th>URL</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td><a href="https://google.com">https://google.com</a></td>
                            <td>Favorite search engine</td>
                        </tr>
                    </thead>
                </table>
            </section>
    </main>
  );
}