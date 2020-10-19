var express = require('express');
var router = express.Router();

const tasks = require("../controllers/task.controller.js");
const taskGroups = require("../controllers/taskgroup.controller.js");
const taskDependencies = require("../controllers/taskdependency.controller.js");
const seeder = require("../controllers/seeder.controller.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* -----------API for UnDigital----------- */

/* -----SEED TABLES----- */
router.get('/seed', seeder.createTables);

/* -----TASKS----- */

/*
*  Return a single task -
*  Each task includes task group id and all dependencies.
*
*  Note:
*    States: 0 => open, 1 => done, 2 => locked
*
*  return ex:
*  [
*    id: 1,
*    name: "Task Name",
*    task_group_id: 3,
*    state: 2,
*    dependencies: [2,3,6]
*  ]
* */
router.get('/tasks', tasks.findOne);

//get all tasks
router.get('/tasks/all', tasks.findAll);

//get all tasks within a task group
router.get('/tasks/all/group', tasks.findByGroup);

//create a task
router.post('/tasks', tasks.create);

//update a task
router.put('/tasks', tasks.update);

//delete a task
router.delete('/tasks', tasks.delete);


/* -----TASK GROUPS----- */

//return a task group
router.get('/task_groups', taskGroups.findOne);

//return all task groups (i.e. their names)
router.get('/task_groups/all', taskGroups.findAll);

//create a task group
router.post('/task_groups', taskGroups.create);

//update a task group (change task group name)
router.put('/task_groups', taskGroups.update);

//delete a task group
router.delete('/task_groups', taskGroups.delete);


/* -----TASK DEPENDENCIES----- */

/*
*  Create a single dependency for a single task -
*  Payload must include a taskId and a taskDependencyId
*
* */
router.post('/task_dependencies', taskDependencies.create);

/*
*  Delete a single dependency for a single task -
*  Payload must include a taskId and a taskDependencyId
*
* */
router.delete('/task_dependencies', taskDependencies.delete);

// delete all task_dependencies
router.delete('/task_dependencies/all', taskDependencies.deleteAll);


module.exports = router;
