const inquirer = require("inquirer");

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
      switch (val) {
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

start()
