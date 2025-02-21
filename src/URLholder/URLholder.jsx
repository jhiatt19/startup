import React, {useState, useRef} from 'react';
import './urlHolder.css';

export function URLholder() {
    const [url, setUrl] = useState('https://');
    const[description, setDescription] = useState('Optional Description');
    const urlRef = useRef(null);
    const descriptionRef = useRef(null);
    const [urlInfo, setUrlInfo] = useState({
        url: '',
        description: '',
    })
    const [tableData, setTableData] = useState([]);
    
    const handleDescription = (event) => {
        console.log(event);
        setDescription(event.target.value);
        if (handleDescription.current){
            setDescription(descriptionRef.current.value);
            setUrlInfo({urlInfo,description:event});
        }
    };

    const handleUrl = (e) => {
        console.log(e);
        if (urlRef.current){
            setUrl(urlRef.current.value);
            setUrlInfo({urlInfo, url:e})
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTableData([tableData,urlInfo]);
        setUrlInfo({url:'',description:'',});

        const counter = 0;
        tableData.forEach(element=>{
            console.log(element);
            console.log(counter + 1);
        });
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
                    <input id="bigButton" type="submit"/>
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
                    </thead>
                    <tbody>
                        {tableData.map((data,index) => 
                        <tr key={index}>
                            <td>{data.url}</td>
                            <td>{data.description}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </section>
    </main>
  );
}