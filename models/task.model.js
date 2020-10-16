const sql = require("./db.js");

// constructor
const Task = function(task) {
    this.id = task.id
    this.name = task.name;
    this.task_group_id = task.task_group_id;
    this.state = task.state;
};

Task.create = (newTask, result) => {
    sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created task: ", { id: res.insertId, ...newTask });
        result(null, { id: res.insertId, ...newTask });
    });
};

Task.findById = (taskId, result) => {
    sql.query(`SELECT * FROM tasks WHERE id = ${taskId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found task: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Task with the id
        result({ kind: "not_found" }, null);
    });
};

Task.getAll = result => {
    sql.query("SELECT * FROM tasks t JOIN task_dependencies td ON t.id=td.task_id", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tasks: ", res);
        result(null, res);
    });
};

Task.getWithTaskGroup = (taskGroupId, result) => {
    sql.query(`SELECT * FROM tasks WHERE task_group_id_id = ${taskGroupId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tasks: ", res);
        result(null, res);
    });
};

Task.updateById = (id, task, result) => {
    console.log(task);

    let sqlQuery = "UPDATE tasks SET ";
    let values = [];
    if(task.name !== undefined){
        sqlQuery += "name = ?, ";
        values.push(task.name);
    }

    if(task.state !== undefined){
        sqlQuery += "state = ?, ";
        values.push(task.state);
    }

    if(task.task_group_id !== undefined){
        sqlQuery += "task_group_id = ?, ";
        values.push(task.task_group_id);
    }

    sqlQuery = sqlQuery.slice(0, -2);
    sqlQuery += " WHERE id = ?";
    values.push(task.id);

    console.log(sqlQuery);
    console.log(values);

    sql.query(
        sqlQuery,
        values,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Task with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated task: ", { id: id, ...task });
            result(null, { id: id, ...task });
        }
    );
};

Task.addDependency = (taskId, dependencyId, result) => {
    sql.query("INSERT INTO task_dependencies (task_id, dependency_id) VALUES (?, ?)",
        [taskId, dependencyId],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created task_dependency: ", { id: res.insertId, ...newTask });
        result(null, { id: res.insertId, ...newTask });
    });
};

Task.remove = (id, result) => {
    sql.query("DELETE FROM tasks WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Task with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted task with id: ", taskGroup.id);
        result(null, res);
    });
};

Task.removeAll = result => {
    sql.query("DELETE FROM tasks", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tasks`);
        result(null, res);
    });
};

module.exports = Task;