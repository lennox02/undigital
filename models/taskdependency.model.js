const sql = require("./db.js");

// constructor
const TaskDependency = function(taskDependency) {
    this.task_id = taskDependency.taskId;
    this.task_dependency_id = taskDependency.taskDependencyId;
};

// because this is only a join table, there is no reason for there to be more than one instance of a task_id and
// a dependency id, therefore we do INSERT IGNORE here, to avoid duplicates.
TaskDependency.create = (newTaskDependency, result) => {
    sql.query("INSERT IGNORE INTO task_dependencies SET ?", newTaskDependency, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created taskDependency: ", { id: res.insertId, ...newTaskDependency });
        result(null, { id: res.insertId, taskId: newTaskDependency.task_id, taskDependencyId: newTaskDependency.task_dependency_id});
    });
};

// look up an individual task's dependency tasks
TaskDependency.findByTaskId = (taskId, result) => {
    sql.query(`SELECT * FROM task_dependencies WHERE task_id = ${taskId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found taskDependency: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found TaskDependency with the id
        result({ kind: "not_found" }, null);
    });
};

// remove a task dependency - not by a primary key but by both the task_id and task_dependency_id as there is no
// primary key
TaskDependency.remove = (taskDependency, result) => {
    sql.query("DELETE FROM task_dependencies WHERE task_id = ? AND task_dependency_id = ?", [taskDependency.taskId, taskDependency.taskDependencyId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(taskDependency.taskId)
        console.log(taskDependency.taskDependencyId)

        if (res.affectedRows == 0) {
            // not found TaskDependency with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted taskDependency with task_id: ", taskDependency.taskId);
        result(null, res);
    });
};

// method to clear all dependencies
TaskDependency.removeAll = result => {
    sql.query("DELETE FROM task_dependencies", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} task_dependencies`);
        result(null, res);
    });
};

module.exports = TaskDependency;