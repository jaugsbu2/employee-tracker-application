const express = require('express');
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: "127.0.0.1",
      user: "root",
      password: "STPassW0rd",
      database: "employees_db",
    },
    console.log(`Connected to the employees_db database.`)
  );

function viewDeparments() {
  const sql = 'SELECT id, name AS department FROM departments'
  db.query(sql, (err, results) => {
      console.table (results)
    });
}

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: `What would you like to do?`,
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an Employee",
          "Update an employee role",
        ],
      },
    ])
    .then((val) => {
      switch (val.choice) {
        case "View all departments":
          viewDeparments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateRole();
          break;
      }
    });
}

start();
