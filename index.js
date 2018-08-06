const express    = require("express");
const app        = express();
const port       = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const todoRoutes  = require("./routes/todos");

// These allow me to access the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));


app.get("/", function(req, res){
    res.sendFile("index.html");
});


// Here I am specifying that I want this entire application to read the todoRoutes as starting with "/api/todos"
app.use("/api/todos", todoRoutes)


app.listen(port, function(){
    console.log("===============================");
    console.log("SERVER OPERATING ON PORT: " + process.env.PORT);
    console.log("===============================");
})