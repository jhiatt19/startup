# Still working on a cool name


## 🚀 Specification Deliverable

### Elevator Pitch

I struggle with ADHD. This struggle makes it difficult for me to remember all of the tasks that I have going on and can make it difficult to priortize each task in an appropriate manner. This has caused me to forget about big projects, plans with friends, and many other meetings. An easy solution to this could be to write everything down and constantly check my list. However, this can end up causing me to have more anxiety as I keep seeing all of the things I need to get done. If only there was a way to be able to write everything down and priortize those tasks so that I don't forget to do anything, but don't feel the stress with seeing a long list of tasks. Well I'm hoping to solve this with this amazing planning and prioritizing tool, **insert cool name for website**. This tool will help someone to organize all of the many tasks that they have to do and will send reminders about upcoming due dates for tasks you may have forgotten about. Gone are the days of writing down a plan to get all of your tasks done to only to lose the plan or forget that you made this plan. With **insert cool name for website** you can kiss those stress filled days goodbye!

![Login Screen](./Images/Login_screen.png)

![Main Page](./Images/Main_page.png)

![Create new page](./Images/Create_new_page.png)

### Key Features
* Login athentication required for each user.
* Tasks will be saved in database.
* Tasks will update priority in real time as task dates get closer.
* Calendar will create scheduled times when tasks should get started during based on your calendar and estimated time of tasks.
* Notifications about current traffic condiditons and leaving for next event are shown as well.

### Technologies

**HTML:** 3-4 html pages
1. Homepage/Login
2. Priority task dashboard
3. Add new tasks page
4. Other page (Calendar, traffic, etc.)

**CSS:** Application styled in a way to support the user experience.

**JavaScript:** Provides functionality to buttons, drop downs, etc. using JavaScript and the React web framework.

**Services:** Website will use API's for calendar and traffic services among potential use for others depending on difficulty to include.

**Authentication:** Login page will allow users to provide authentication for their account and login. After login, user's account name will be displayed in the login button corner.

**WebSocket data:** Traffic data will be update to inform user if they need to leave earlier for an event. Or will give an alert if a task is due soon and hasn't been completed.


## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://jordanhiatt.org).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I created 8 html pages for my website 1 login, 1 signup, 1 home page, and then 5 tool pages.
- [x] **Proper HTML element usage** - I used HTML elements properly in all of my html pages.
- [x] **Links** - I have links connecting all of my pages together through the navigation page. I also have a link connecting to my github page on the bottom of each page.
- [x] **Text** - Text was added to my page describing what each tool could be used for.
- [x] **3rd party API placeholder** - I created a calendar out of a table to act as a placeholder for a 3rd party API to be added in later.
- [x] **Images** - 3 images were added to different HTML pages. 1 on the sign up page, 1 on the homepage, and another on the url holder.
- [x] **Login placeholder** - There is a login html page that will be used to store login credentials.
- [x] **DB data placeholder** - Multiple form submissions are included throughout the website. These forms are used to save tasks, hold calendar data, hold onto url's, ect. Specifically this is shown on the Productivity Calendar page.
- [x] **WebSocket placeholder** - I currently have a websocket placeholder in place for when someone enters a new task (Productivity Calendar page). When a new task is submitted all users will be notified of a task being added. Future deliverables may adjust this feature, but for now that is where this technology is planned on being used.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I created a main CSS page that created a uniform styling for the header, footer, adn main content for all of the pages. Other CSS files were created to make slight adjustments to each individual html page as needed.
- [x] **Navigation elements** - I created a uniform navigation elements that stick to the top of the page if the will scroll down. 
- [x] **Responsive to window resizing** - Almost all of my elements use responsive resizing. This means that no matter the size of the page all of the different parts of the page should be in similar spots as before. This is especially shown with the header and the main title and two buttons will adjust as the page shrinks.
- [x] **Application elements** - All of my elements have been adjusted to ensure that the page is responsive and is easy to navigate. Buttons are resized to be bigger, text input forms have been enlarged, and the tables have been formatted to have each cell be the same width.
- [x] **Application text content** - All of my text is added onto the page in such a way that it is easy to read looks pretty good.
- [x] **Application images** - My application image on the urlHolder page was changed to have the dimensions held by the CSS file instead of declared in the html.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

I have done the Simon react and deployed it to the simon service prior to undergoing my own startup.

- [x] **Bundled using Vite** - I bundled my startup using Vite and update the package.json to use vite commands and added the necessary packages.
- [x] **Components** - I created 8 components that house the html code for those pages. Thereby making my startup dependent on 1 index.html, 1 index.jsx, and 2 directories (public and src).
- [x] **Router** - I successfully routed my website to go between all of the different pages just like it did when I was hrefrencing between .html pages.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - For this deliverable I mocked out the implementation for many parts of my website, but not all of the parts. My website has 5 different parts to it and I was able to get 3.5 of the parts working. However, the parts that I did mock out or implement all show that I understand how to implement reactivity in multiple ways. I wanted to give myself the option to put as much work into each deliverable as would allow me. So for the first 3 deliverables I was able to easily create the html, css, and routing for a website this big. Trying to create reactivity for 5 different parts was not possible during this time frame. Websocket shown on Productivity Calendar/Task Prioritizer and 3rd party calls are shown on the PDF extractor. 
- [x] **Hooks** - I implemented multiple unique hooks across my website. These include useState, useEffect, useRef, useNavigate, and others. This helped to create a functional website with lots of different reactivity components. 


## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - My website uses Node.js and Express to create and handle HTTP requests and responses.
- [x] **Static middleware for frontend** - My website uses static middleware for the frontend with apiRouter, bcrypt, and cookie-parser.
- [x] **Calls to third party endpoints** - On my home page I make a call to WeatherXu to request weather data, and then displays the forecast for the next week.
- [x] **Backend service endpoints** - My backend has multiple service endpoints to handle adding, displaying, and removing task data sent in from the front end.
- [x] **Frontend calls service endpoints** - My frontend calls the backend service endpoints with the task prioritizer, login, logout, and register. These endpoints are usually called when a button is pressed and transfers data in the body of the request if it is a post request.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
