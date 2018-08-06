const mongoose = require("mongoose");

// Set debug mode to "true" for greater visibility into debugging
mongoose.set("debug", true);

// Connect to database server
mongoose.connect("mongodb://localhost/todo-api");

// Allow myself to use the Promise syntax/tell mongoose I am going to use promises
mongoose.Promise = Promise;

// I assume that, in the future, I will require all models into this one index file and then I will require this single index file (instead of 20 individul models) in the main app.js file
module.exports.Todo = require("./todo");