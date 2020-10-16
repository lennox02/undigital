const sql = require("../models/db.js");

// constructor
const Seeder = function(seed) {
    this.name = seed.name;
};

//I'd like to condense this code, but alas my node/express is shaky -
//if I try to combine all three queries into one (with semicolons) I get
//a syntax error even though running the same combined queries in the terminal
//works just fine...
Seeder.createTables = result => {

    sql.query("CREATE TABLE IF NOT EXISTS tasks (id int NOT NULL AUTO_INCREMENT, name text, task_group_id int, state" +
        " tinyint DEFAULT 0, PRIMARY KEY (id))", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tables: ", res);
    });

    sql.query("CREATE TABLE IF NOT EXISTS task_groups (id int NOT NULL AUTO_INCREMENT, name text, PRIMARY KEY (id))", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tables: ", res);
    });

    sql.query("CREATE TABLE IF NOT EXISTS task_dependencies (task_id int," +
        " task_dependency_id int, UNIQUE KEY  (task_id, task_dependency_id))", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tables: ", res);
        result(null, res);
    });
};

module.exports = Seeder;