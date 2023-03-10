const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to employees database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "STPassW0rd",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

// Database queries
function viewDeparments() {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT id, name AS department FROM departments";
    db.query(sql, (err, results) => {
      if (results) {
        const table = console.table(results);
        resolve(table);
      }
    });
  });
}

function viewRoles() {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT roles.id AS Role_Id, roles.title, roles.salary, departments.name AS Department_Name FROM roles JOIN departments ON roles.department_id = departments.id";
    db.query(sql, (err, results) => {
      if (results) {
        const table = console.table(results);
        resolve(table);
      }
    });
  });
}

function viewEmployees() {
  return new Promise(function (resolve, reject) {
    const sql =
      "select employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, departments.name AS department_name, t2.first_name as manager_first_name, t2.last_name as manager_last_name from employee JOIN roles ON employee.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employee t2 on employee.manager_id = t2.id";
    db.query(sql, (err, results) => {
      if (results) {
        const table = console.table(results);
        resolve(table);
      }
    });
  });
}

function addDepartment(body) {
  return new Promise(function (resolve, reject) {
    const params = [body.department_name];
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    db.query(sql, params, (err, results) => {
      if (err) {
        console.log(err);
      }
      resolve(
        console.log(`${body.department_name} has been successfully added!`)
      );
    });
  });
}

function addRole(body, department_id) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ("${body.title}", ${body.salary}, ${department_id})`;
    db.query(sql, (err, results) => {
      if (err) {
        console.log(err);
      }
      resolve(console.log(`${body.title} has been successfully added!`));
    });
  });
}

function getDepartments() {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT id, name AS department FROM departments";
    db.query(sql, (err, results) => {
      if (results) {
        const departments = results;
        resolve(departments);
      }
    });
  });
}

function getroles() {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT title AS role FROM roles";
    db.query(sql, (err, results) => {
      if (results) {
        const roles = results;
        resolve(roles);
      }
    });
  });
}

function getmanagers(roles) {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT id, first_name, last_name FROM employee";
    db.query(sql, (err, results) => {
      if (results) {
        const employeesAndroles = [];
        employeesAndroles.push(roles);
        employeesAndroles.push(results);
        resolve(employeesAndroles);
      }
    });
  });
}


function addEmployee(body, employeesAndroles) {
  const roleNames = [];
  for (i = 0; i < employeesAndroles[0].length; i++) {
    roleNames.push(employeesAndroles[0][i].role);
  }

  const employeeNames = [];
  for (i = 0; i < employeesAndroles[1].length; i++) {
    employeeNames.push(
      `${employeesAndroles[1][i].first_name} ${employeesAndroles[1][i].last_name}`
    );
  }
  return new Promise(function (resolve, reject) {
    const role_id = roleNames.indexOf(body.role) + 1;
    const manager_id = employeeNames.indexOf(body.manager) + 1;
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${body.first_name}", "${body.last_name}",${role_id}, ${manager_id})`;
    db.query(sql, (err, results) => {
      if (err) {
        console.log(err);
      }
      resolve(
        console.log(
          `${body.first_name} ${body.last_name} has been successfully added!`
        )
      );
    });
  });
}

function updateEmployee(body, employeesAndroles) {
  const roleNames = [];
  for (i = 0; i < employeesAndroles[0].length; i++) {
    roleNames.push(employeesAndroles[0][i].role);
  }

  const employeeNames = [];
  for (i = 0; i < employeesAndroles[1].length; i++) {
    employeeNames.push(
      `${employeesAndroles[1][i].first_name} ${employeesAndroles[1][i].last_name}`
    );
  }
  return new Promise(function (resolve, reject) {
    const role_id = roleNames.indexOf(body.role) + 1;
    const employee_id = employeeNames.indexOf(body.employee) + 1;
    const sql = `UPDATE employee SET role_id = ${role_id} WHERE id = ${employee_id}`;
    db.query(sql, (err, results) => {
      if (err) {
        console.log(err);
      }
      resolve(
        console.log(
          `The role for ${body.employee} has been successfully updated to ${body.role}!`
        )
      );
    });
  });
}

// Inquirer Prompts

function promptAdddepartment() {
  inquirer
    .prompt([
      {
        type: "entry",
        name: "department_name",
        message: "Enter the name of your new department.",
      },
    ])
    .then((val) => {
      if (val) {
        addDepartment(val).then(() => {
          startOver();
        });
      }
    });
}

function promptAddrole(departments) {
  const departmentNames = [];
  for (i = 0; i < departments.length; i++) {
    departmentNames.push(departments[i].department);
  }

  inquirer
    .prompt([
      {
        type: "entry",
        name: "title",
        message: "Enter the name of your new role.",
      },
      {
        type: "entry",
        name: "salary",
        message: "Enter the salary of your new role.",
      },
      {
        type: "list",
        name: "department_name",
        message: "What department is this role in?",
        choices: departmentNames,
      },
    ])
    .then((val) => {
      if (val) {
        getDepartments().then((departments) => {
          const departmentNames = [];
          for (i = 0; i < departments.length; i++) {
            departmentNames.push(departments[i].department);
          }

          const department_id = departmentNames.indexOf(val.department_name);
          const departmentId = department_id + 1;
          if (departmentId !== 0) {
            addRole(val, departmentId).then(() => {
              startOver();
            });
          }
        });
      }
    });
}

function promptAddemployee(employeesAndroles) {
  const roleNames = [];
  for (i = 0; i < employeesAndroles[0].length; i++) {
    roleNames.push(employeesAndroles[0][i].role);
  }

  const employeeNames = [];
  for (i = 0; i < employeesAndroles[1].length; i++) {
    employeeNames.push(
      `${employeesAndroles[1][i].first_name} ${employeesAndroles[1][i].last_name}`
    );
  }

  inquirer
    .prompt([
      {
        type: "entry",
        name: "first_name",
        message: "Enter the first name of the new employee.",
      },
      {
        type: "entry",
        name: "last_name",
        message: "Enter the last name of the new employee.",
      },
      {
        type: "list",
        name: "role",
        message: "What role is this employee going to perform?",
        choices: roleNames,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is this employee's manager?",
        choices: employeeNames,
      },
    ])
    .then((val) => {
      if (val) {
        getroles().then((roles) => {
          getmanagers(roles).then((employeesAndroles) => {
            addEmployee(val, employeesAndroles).then(() => {
              startOver();
            });
          });
        });
      }
    });
}

function promptChangerole(employeesAndroles) {
  const roleNames = [];
  for (i = 0; i < employeesAndroles[0].length; i++) {
    roleNames.push(employeesAndroles[0][i].role);
  }

  const employeeNames = [];
  for (i = 0; i < employeesAndroles[1].length; i++) {
    employeeNames.push(
      `${employeesAndroles[1][i].first_name} ${employeesAndroles[1][i].last_name}`
    );
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "What employee do you want to change the role for?",
        choices: employeeNames,
      },
      {
        type: "list",
        name: "role",
        message: "What is this employee's new role?",
        choices: roleNames,
      },
    ])
    .then((val) => {
      if (val) {
        getroles().then((roles) => {
          getmanagers(roles).then((employeesAndroles) => {
            updateEmployee(val, employeesAndroles).then(() => {
              startOver();
            });
          });
        });
      }
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
          viewDeparments().then(() => {
            startOver();
          });
          break;
        case "View all roles":
          viewRoles().then(() => {
            startOver();
          });
          break;
        case "View all employees":
          viewEmployees().then(() => {
            startOver();
          });
          break;
        case "Add a department":
          promptAdddepartment();
          break;
        case "Add a role":
          getDepartments().then((departments) => {
            promptAddrole(departments);
          });
          break;
        case "Add an Employee":
          getroles().then((roles) => {
            getmanagers(roles).then((employeesAndroles) => {
              promptAddemployee(employeesAndroles);
            });
          });
          break;
        case "Update an employee role":
          getroles().then((roles) => {
            getmanagers(roles).then((employeesAndroles) => {
              promptChangerole(employeesAndroles);
            });
          });
          break;
      }
    });
}

function startOver() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "choice",
        message: `Do you want to do something else?`,
      },
    ])
    .then((val) => {
      if (val.choice) {
        start();
      } else {
        console.log("Goodbye");
        process.exit();
      }
    });
}

start();
