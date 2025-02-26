import React, {useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import '../all.css';

export function Home() {
  return (
    <main>
      <div >
      <img src="https://media.licdn.com/dms/image/v2/D5612AQHSjbT7e9eCCg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1699466621872?e=1743638400&v=beta&t=iMQ_j1VZOh6T2YykHVFlpRzb07QN2jj37iUJJNx_H2M"/>
        <section>
            <h2>What the heck is this website all about?</h2>
            <p>This website is going to have pages that I have feel will be helpful to have in one place. Gone are the days of having 45 tabs open and crashing my computer. I will attempt to have all the necessary tools/pages all in one place.</p>
        </section>
        <section>
            <h3><a href="/PDFextractor">PDF extractor</a></h3>
            <p>Do you have difficulties with reading? Do you have even more difficulties reading PDF's on a computer screen. Use this tool to extract text from a PDF file and get it returned into a text file or other potential file types.</p>
        </section>
        <section>
            <h3><a href="/ProductivityCalendar">Task Prioritizer</a></h3>
            <p>Do you have difficulty determining which task you should do next? Do you forget about important tasks? Use this tool to organize your tasks onto your calendar so you don't forget tasks and you don't ever have to figure out which task you need to do next.</p>
        </section>
        <section>
            <h3><a href="/Calendar">Calendar</a></h3>
            <p>Click above to get a more detailed/larger calendar.</p>
            <table>
                <thead>
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>9</td>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                    </tr>
                    <tr>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                    </tr>
                    <tr>
                        <td>29</td>
                        <td>30</td>
                        <td>31</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </section>
        <section>
            <h3><a href="/Alarms">Alarms</a></h3>
            <p>Does time fly by when you are having fun or get hyperfocused? Use this tool to set alarms so that you don't lose track of time. Or use it to help get up in the morning with Alarms made to make it impossible to hit snooze 19 times and sleep through life.</p>
        </section>
        <section>
            <h3><a href="/URLholder">URLholder</a></h3>
            <p>Do you have tabs open because you need them for the next couple of days/weeks but don't want to go through the trouble of bookmarking the tab. Use this tool to keep URL's you need for later and not have 85 tabs going.</p>
        </section>
      </div>
    </main>
  );
}