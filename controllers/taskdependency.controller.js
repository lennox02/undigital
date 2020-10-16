const TaskDependency = require("../models/taskdependency.model.js");

// Create and Save a new TaskDependency
exports.create = (req, res) => {
    // Validate request
    if (!req.body.taskId || !req.body.taskDependencyId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a TaskDependency
    const taskDependency = new TaskDependency({
        taskId: req.body.taskId,
        taskDependencyId: req.body.taskDependencyId
    });

    // Save TaskDependency in the database
    TaskDependency.create(taskDependency, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TaskDependency."
            });
        else res.send(data);
    });
};

// Retrieve all TaskDependencies from the database.
exports.findAll = (req, res) => {
    TaskDependency.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        else res.send(data);
    });
};

// Delete a TaskDependency with the specified id in the request
exports.delete = (req, res) => {
    TaskDependency.remove(req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TaskDependency with taskId ${req.body.taskId} and dependencyId ${req.body.taskDependencyId}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete TaskDependency with taskId ${req.body.taskId} and dependencyId ${req.body.taskDependencyId}.`
                });
            }
        } else res.send({ message: `TaskDependency was deleted successfully!` });
    });
};

// Delete all TaskDependencies from the database.
exports.deleteAll = (req, res) => {
    TaskDependency.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tasks."
            });
        else res.send({ message: `All TaskDependencies were deleted successfully!` });
    });
};