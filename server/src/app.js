const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const planetsRouter = require('./routes/planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')
const { launches } = require('./models/launches.model')

const app = express();

app.use(cors({ //allows for cross origin resource sharing. Previously, our server was running on PORT 8000 and our client was running on PORT 3000. CORS does not allow data to be transferred unless you have this specification
    origin: 'http://localhost:3000'
}));

app.use(morgan('combined'));

app.use(express.json()) //middleware that parses json
app.use(express.static(path.join(__dirname, '..', 'public'))) //Middleware function provided by Express.js that serves static files from a directory. Static files are files that are not processed by the server, such as HTML, CSS, JavaScript, images, and videos.

app.use('/planets', planetsRouter) 
app.use('/launches', launchesRouter) //will only react to requests under the /launches path

// The * matches any endpoint that isnt shown above, it passes it on to our react application to handle the routing instead 
app.get('/*', (req, res) => { // Our frontend application is only routing the / and /launch routes to the launch page. Index.html is not one of them. 
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html')) // Serves our index.html from our / route so the user doesnt have to specify they want to run index.html
}) // First page load now corresponds to the launch page

module.exports = app;