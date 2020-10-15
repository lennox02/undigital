var express = require('express');
var router = express.Router();0

const tasks = require("../controllers/task.controller.js");
const taskGroups = require("../controllers/taskgroup.controller.js");
const seeder = require("../controllers/seeder.controller.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* API for UnDigital */

/* SEED TABLES */
router.get('/seed', seeder.createTables);

/* TASKS */
//return all tasks
router.get('/tasks', tasks.findAll);

//create a task
router.post('/tasks', tasks.create);

//update a task
router.put('/tasks', tasks.update);

//delete a task
router.delete('/tasks', tasks.delete);

/* TASK GROUPS */
//return all task groups
router.get('/task_groups', taskGroups.findAll);

//create a task group
router.post('/task_groups', taskGroups.create);

//update a task group
router.put('/task_groups', taskGroups.update);

//delete a task group
router.delete('/task_groups', taskGroups.delete);


module.exports = router;
