const mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    // Using objects in the schema allow me to access additional functionality of a property. In yelpcamp, I would have said "name: String" and be done with it. Now, I need to advance and use advanced features   
    name: {
        type: String,
        required: "Name cannot be blank!"
    },
    completed: {
        type: Boolean,
        // When I add a new todo I should not have to specify that I haven't completed it yet, the app should know that the default completion setting for new entries is "not completed", thus, "false".
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// Now, compile this schema to a model and assign that model to a variable
var Todo = mongoose.model("Todo", todoSchema);

// Prepare this file, which is the schema compiled to the Todo model, for export
module.exports = Todo;