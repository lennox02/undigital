const Task = require("../models/task.model.js");
const TaskDependency = require("../models/taskdependency.model.js");

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Task
    const task = new Task({
        name: req.body.name,
        task_group_id: req.body.taskGroupId,
        state: req.body.state
    });

    // Save Task in the database
    Task.create(task, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        else res.send(data);
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    Task.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        else {
            let massagedData = massageData(data);
            res.send(massagedData);
        }
    });
};

// Retrieve all Tasks from the database.
exports.findByGroup = (req, res) => {
    Task.getWithTaskGroup(req.body.taskGroupId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        else {
            let massagedData = massageData(data);
            res.send(massagedData);
        }
    });
};

// Find a single Task with a id
exports.findOne = (req, res) => {
    Task.findById(req.body.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Task with id ${req.body.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Task with id " + req.body.id
                });
            }
        } else res.send(data);
    });
};

// Update a Task identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // check for dependencies
    if(req.body.state === 1) {
        TaskDependency.findByTaskId(req.body.id, (err, data) => {
            if (data !== null) {
                res.status(400).send({
                    message: "Cannot complete a task with dependencies (it is locked)"
                });
            } else {
                updateById(req, res);
            }
        });
    } else {
        // ugh, lovely async.
        updateById(req, res);
    }

};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    Task.remove(req.body.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Task with id ${req.body.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Task with id " + req.body.id
                });
            }
        } else res.send({ message: `Task was deleted successfully!` });
    });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
    Task.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tasks."
            });
        else res.send({ message: `All Tasks were deleted successfully!` });
    });
};

function updateById(req, res){
    Task.updateById(
        req.body.id,
        new Task(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Task with id ${req.body.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Task with id " + req.body.id
                    });
                }
            } else {
                if (req.body.state === 1) {

                    // if this task is done remove it from dependencies list.
                    TaskDependency.removeById(req.body.id);
                }

                res.send(data);
            }
        }
    );
}

function massageData(data){
    let massagedData = [];
    //if a task has dependencies then it is locked
    console.log(data);
    data.forEach(function(item){
        if(item.task_dependencies !== null){
            item.state = 3;
        }
        massagedData.push(item);
    });

    return massagedData;
}