const express = require("express");
const router  = express.Router();
const db      = require("../models")
const helpers = require("../helpers/todos");

// Watch the pathing since these first two routes both point to "/" while the following 3 routes all point to "/:todoId"
router.route("/")
.get(helpers.getTodos)
.post(helpers.createTodo);

router.route("/:todoId")
.get(helpers.getTodoById)
.put(helpers.updateTodo)
.delete(helpers.deleteTodo);


module.exports = router;