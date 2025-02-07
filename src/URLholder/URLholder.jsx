import React from 'react';
import './urlHolder.css';

export function URLholder() {
  return (
    <main>
        <h3>URL Holder</h3>
            <section>
                <img src="https://cdn.prod.website-files.com/5efa7dedd66555c407f7e6c4/6011b1a6692592dccf6e91b1_A%20mess%20of%20tab%20-%20having%20too%20many%20tabs%20open%20is%20killing%20your%20productivity.png"/>
                <form id="websiteSubmit">
                    <label for="website">Add URL:</label>
                    <input type="url" id="website" name="website" value="https://" required/>
                    <input type="text" id="website" name="description" placeholder="Optional description"/>
                    <button id="bigButton" type="submit">Submit</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th id="topRow" colspan="2">Saved URL's</th>
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