const mysql = require("mysql2")
const db = require("./connections.js")

function viewAllEmployees() {
    const sql = `SELECT * FROM employees`;
    console.log(sql)
    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err.message)
            return;
        }
        console.table(rows)
    });
};

function viewAllRoles() {
    const sql = `SELECT * FROM roles`;
    console.log(sql)
    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err.message)
            return;
        }
        console.table(rows)
    });
};

function viewAllDepartments() {
    const sql = `SELECT * FROM departments`;
    console.log(sql)
    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err.message)
            return;
        }
        console.table(rows)
    });
};



function addEmployee({ first_name, last_name, role_id, manager_id }) {
    const sql = `INSERT INTO employees (first_name,last_name,role_id,manager_id)
      VALUES (?,?,?,?)`;
    const params = [first_name, last_name, role_id, manager_id];

    db.query(sql, params, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.log(res)
    });
};

function addRole({ role_title, role_salary, department_id }) {
    const sql = `INSERT INTO roles (first_name,last_name,role_id,manager_id)
      VALUES (?,?,?,?)`;
    const params = [role_title, role_salary, department_id];

    db.query(sql, params, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.log(res)
    });
};

function addDepartment({ department_name }) {
    const sql = `INSERT INTO departments (first_name,last_name,role_id,manager_id)
      VALUES (?,?,?,?)`;
    const params = [department_name];

    db.query(sql, params, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.log(res)
    });
};

module.exports = {
    viewAllEmployees, viewAllRoles, viewAllDepartments, addEmployee, addRole, addDepartment
}
