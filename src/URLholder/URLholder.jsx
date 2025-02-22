import React, {useState, useRef, useEffect} from 'react';
import {nanoid} from 'nanoid';
import './urlHolder.css';

export function URLholder() {
    const initialDescription = 'Optional Description';
    const [url, setUrl] = useState('https://');
    const[description, setDescription] = useState(initialDescription);
    const urlRef = useRef(null);
    const descriptionRef = useRef(null);
    const [checkItems, setCheckItems] = useState([]);
    const [uniqueID,setUniqueID] = useState('');
    const [tableData, setTableData] = useState(() => {
        const storedTable = localStorage.getItem("myTable");
        return storedTable ? JSON.parse(storedTable) : [];
    });
    
    const handleBlur = () => {
        if (description === ''){
            setDescription(initialDescription);
        };
    } 

    const handleFocus = () => {
        if (description === initialDescription) {
            setDescription('');
        };
    }
    
    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleUrl = (e) => {
        setUrl(e.target.value); 
        setUniqueID(nanoid());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTableData([...tableData,{id:uniqueID, url:url,description:description,}]);
        setUrl("https://");
        setDescription('');
        
    };

    const handleCheckItems = (id) => {
        if (checkItems.includes(id)){
            setCheckItems(checkItems.filter((item) => item !== id));
        }
        else{
            setCheckItems([...checkItems,id]);
        }
    };

    const handleEdit = () => {
        const removeRows = document.querySelectorAll('.checkBox:checked');
        const removeIDs = Array.from(removeRows).map(rmID => rmID.dataset.rowId);
        setTableData(tableData => tableData.filter(row => !removeIDs.includes(row.id)));
        setCheckItems([]);
    };

    useEffect(()=> { 
        localStorage.setItem("myTable",JSON.stringify(tableData));
    }, [tableData]);
    
  return (
    <main>
        <h3>URL Holder</h3>
            <section>
                <img src="https://cdn.prod.website-files.com/5efa7dedd66555c407f7e6c4/6011b1a6692592dccf6e91b1_A%20mess%20of%20tab%20-%20having%20too%20many%20tabs%20open%20is%20killing%20your%20productivity.png"/>
                <form id="websiteSubmit" onSubmit={handleSubmit}>
                    <label htmlFor="website">Add URL:</label>
                    <div id="inputBoxes">
                        <input type="url" className="website" id="website" value={url} ref={urlRef} onChange={handleUrl} required/>
                        <input type="text" className="website" id="description" value={description} ref={descriptionRef} onChange={handleDescription} onFocus={handleFocus} onBlur={handleBlur}/>
                    </div>
                    <div id="buttons">
                        <button id="bigButton" type="submit">Submit</button>
                        <button id="bigButton" type="button" onClick={handleEdit}>Remove</button>
                    </div>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th id="topRow" colSpan="3">Saved URL's</th>
                        </tr>
                        <tr>
                            <th>URL</th>
                            <th>Description</th>
                            <th>Remove?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data,uniqueID) => 
                        <tr key={uniqueID}>
                            <td><a href={data.url}>{data.url}</a></td>
                            <td>{data.description}</td>
                            <td><input className='checkBox' data-row-id={data.id} checked={checkItems.includes(data.id)} type="checkbox" onChange={() => handleCheckItems(data.id)}/></td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </section>
    </main>
  );
}