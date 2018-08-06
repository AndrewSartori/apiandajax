***Preparing for REACT***
* Build a JSON API
    - Back-End JSON API: Express
* Build a Single Page Application (SPA) that consumes my own JSON API
    - Front-End Technology: React

<Required>
* Postman = where all API route testing occurs. This cannot be accomplished via c9

*How an API works in Node.js*
* Node was purpose built to embrace asynchronous functions, which is particularly useful in dealing with user input and corresponding output.
* This idea means that Node is the perfect server side technology for a front-end UI that has a lot of moving parts, or a front-end with a lot of interactivity, or a front-end with a lot of heavy design elements.
* Thus, create GET, POST, GET, PUT, DELETE routes for a specific data model, and connect that model to a front end by using AJAX calls.
* In practice, I will have pages that will request information from my own API, thus, I must separate the API routes from the non-API routes

*API Overview*
* The Data
Field           Type
=========================
name:           String,
completed:      Boolean,
createdDate:    Date
_I will use these data fields to create the model that the API will CRUD to_

* API Endpoints (which are just RESTful routes)
Verb        Route                   Description
=================================================
GET         /api/todos              List all to-dos
POST        /api/todos              Create new to-do
GET         /api/todos/:todoID      Retrieve a to-do
PUT         /api/todos/:todoID      Update a to-do
DELETE      /api/todos/:todoID      Delete a to-do
_These API “endpoints" are simply unique URLs that represents objects or collections of objects_


*API Walkthrough*
* npm init
* specify the js file to be used
* create that js file
* npm install express --save
* setup the index file
    const express = require("express");
    const app     = express();
    const port    = process.env.PORT || 3000;
    
    app.get("/", function(req, res){
        res.send("VERIFYING FUNCTIONALITY OF THE root ROUTE");
    });
    
    app.listen(port, function(){
        console.log("===============================");
        console.log("SERVER OPERATING ON PORT: " + process.env.PORT);
        console.log("===============================");
    })
* Install mongoDB and mongoose
    sudo apt-get install -y mongodb-org
    mkdir data
    echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
    chmod a+x mongod
    ./mongod
    npm install mongoose --save
* Connect express app to mongoDB via mongoose
    - mkdir models
    - touch models/index.js 
    - touch models/todo.js
* Define to-do schema
    - After creating the schema model and compiling it to a variable, export the model to the index file in the models directory (nice consolidation technique)
* Define the Index route
    -  Label the api routes specifically so that there is no confusion over which routes are part of the API and which are not, thus,
* Before making the POST route, install body parser
    - npm install body-parser --save
        - this package takes in the body as a string and converts it into an object that I can use
    - const bodyParser = require("body-parser");
      // These allow me to access the request body
    - app.use(bodyParser.json());
    - app.use(bodyParser.urlencoded({extended: true}));
* API routes will start expanding
    - These API routes require CRUDing resources (specified via the mongoose schema) and, thus, they will heavily utilize Promises (for their speciality in dealing with asynchronicity)
    - Using Promises takes multiple lines of code, thus, I will eventually need to refactor the API routes
* Define SHOW route (which retrieves information about a specific Todo)
* Define UPDATE route
    * This route is a little tricky because it has to have some purpose. In this example, it toggles the boolean value of "completed" from "true" to "false" each time the todo is clicked. What will this route do in/for other applications? I don't know, but that must be determined before writing this route.
    - Have to find a specific todo and then update it
    - First, pass in an object that tells mongoose how to find the specific resource by its ID
    - Second, after passing in the object, I need to specify what to update, that being whatever is in the body of the request
    - There's an issue with mongoose where it will respond with the old data but save the new data in the DB. This can be fixed by adding "{new: true}" after  "req.body" thus forcing mongoose to respond with the new DB entry instead of the old one
* Define DELETE route
* Refactor the API
    - This will be accomplished by creating a "helper functions" folder and storing the logic of the routes within a helper function that will be called within the API routes 
    - Save the callback function, from each API route, to its own function within the "helpers" file and export those functions to the API (require them in the API file)
    - Next, append each of the API route functions to the relevant HTTP request (being facilitated via Express) but be wary of the pathing since these route helper functions can be grouped based on their pathing, but not all paths are identical for each route.

*Consuming my API via Single Page Application*
* Serve static files (read: non-API route and template)
    - Specify the root route (GET request)
        app.get("/", function(req, res){
            res.sendFile("index.html");
        });
    - app.use(express.static(__dirname + "/views"));
        - What is happening here is that I am referencing the static file "index.html" in the root GET route
        - My express app has no idea where that static file is located, but the "express.static(__dirname)" references the "current directory/views" automatically when I am responding to a get request with a static file (thus, "sendFile" must be used instead of "render")
        - ALSO, I need to do the exact same thing when I want to include my static css files (in the public directory). By using the code, below, all files in the public directory are being served by the app as static files
            - app.use(express.static(__dirname + "public"));
* Install nodemon
    - npm install nodemon -g (the "g" stands for "global")
        - this package watches my files for changes and restarts the server after a change has been made
        - use "nodemon index.js" to start nodemon
* Install jQuery via CDN
* Position your HTML elements and write the corresponding CSS 
    - After this point, it's all about AJAX, logic, and jQuery
* AJAX...till the end!
    - The app.js file, within the public directory, 