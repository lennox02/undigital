const TaskGroup = require("../models/taskgroup.model.js");

// Create and Save a new TaskGroup
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a TaskGroup
    const taskGroup = new TaskGroup({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });

    // Save TaskGroup in the database
    TaskGroup.create(taskGroup, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TaskGroup."
            });
        else res.send(data);
    });
};

// Retrieve all TaskGroups from the database.
exports.findAll = (req, res) => {
    TaskGroup.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving taskGroups."
            });
        else res.send(data);
    });
};

// Find a single TaskGroup with a taskGroupId
exports.findOne = (req, res) => {
    TaskGroup.findById(req.params.taskGroupId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TaskGroup with id ${req.params.taskGroupId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving TaskGroup with id " + req.params.taskGroupId
                });
            }
        } else res.send(data);
    });
};

// Update a TaskGroup identified by the taskGroupId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    TaskGroup.updateById(
        req.params.taskGroupId,
        new TaskGroup(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found TaskGroup with id ${req.params.taskGroupId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating TaskGroup with id " + req.params.taskGroupId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a TaskGroup with the specified taskGroupId in the request
exports.delete = (req, res) => {
    TaskGroup.remove(req.params.taskGroupId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TaskGroup with id ${req.params.taskGroupId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete TaskGroup with id " + req.params.taskGroupId
                });
            }
        } else res.send({ message: `TaskGroup was deleted successfully!` });
    });
};

// Delete all TaskGroups from the database.
exports.deleteAll = (req, res) => {
    TaskGroup.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all taskGroups."
            });
        else res.send({ message: `All TaskGroups were deleted successfully!` });
    });
};