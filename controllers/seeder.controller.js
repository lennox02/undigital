const Seeder = require("../seeders/main.seeder.js");

// Create DB tables
exports.createTables = (req, res) => {
    Seeder.createTables((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating tables."
            });
        else res.send(data);
    });
};