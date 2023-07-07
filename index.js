const inquirer = require("inquirer");
const connection = require('./main/server/connections');
const { viewAllEmployees, addEmployee, viewAllRoles, viewAllDepartments, addRole, addDepartment, updateEmployee } = require("./main/db/queries.js")

// Function to display the main menu
function menu() {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        "View All Employees",
        "View All Roles",
        "View all Departments",
        "Add Role",
        "Add Employee",
        "Add Department",
        "Update Employee",
      ],
    },
  ]).then((answers) => {
    const selectedOption = answers.choice;
    switch (selectedOption) {
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'View all Departments':
        viewAllDepartments();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Update Employee':
        updateEmployee();
        break;
      case 'Exit':
        process.exit(0);
    }
  });
}

// Call the menu function to start the application
menu();





