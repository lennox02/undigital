const sql = require("./db.js");

// constructor
const TaskGroup = function(taskGroup) {
    this.email = taskGroup.email;
    this.name = taskGroup.name;
    this.active = taskGroup.active;
};

TaskGroup.create = (newTaskGroup, result) => {
    sql.query("INSERT INTO task_groups SET ?", newTaskGroup, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created taskGroup: ", { id: res.insertId, ...newTaskGroup });
        result(null, { id: res.insertId, ...newTaskGroup });
    });
};

TaskGroup.findById = (taskGroupId, result) => {
    sql.query(`SELECT * FROM task_groups WHERE id = ${taskGroupId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found taskGroup: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found TaskGroup with the id
        result({ kind: "not_found" }, null);
    });
};

TaskGroup.getAll = result => {
    sql.query("SELECT * FROM taskGroups", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("taskGroups: ", res);
        result(null, res);
    });
};

TaskGroup.updateById = (id, taskGroup, result) => {
    sql.query(
        "UPDATE task_groups SET name = ?WHERE id = ?",
        [taskGroup.name, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found TaskGroup with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated taskGroup: ", { id: id, ...taskGroup });
            result(null, { id: id, ...taskGroup });
        }
    );
};

TaskGroup.remove = (id, result) => {
    sql.query("DELETE FROM task_groups WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found TaskGroup with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted taskGroup with id: ", id);
        result(null, res);
    });
};

TaskGroup.removeAll = result => {
    sql.query("DELETE FROM task_groups", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} taskGroups`);
        result(null, res);
    });
};

module.exports = TaskGroup;