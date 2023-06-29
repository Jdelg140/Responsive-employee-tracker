const inquirer = require("inquirer")
const { viewAllEmployees, addEmployee, viewAllRoles, viewAllDepartments, addRole, addDepartment } = require("./queries.js")

function menu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees",
                "View All Employee Roles",
                "View all Employees By Deparments",
                "Update Employee",
                "Add Employee",
                "Add Role",
                "Add Department"
            ]
        }
    ])
        .then(answers => {

            const selectedOption = answers.choice;
            switch (selectedOption) {
                case 'View All Employees':
                    viewAllEmployees()
                    break;
                case 'View All Employee Roles':
                    viewAllRoles()
                    break;
                case 'View all Employees By Deparments':
                    viewAllDepartments()
                    break;
                case 'Update Employee':
                    updateEmployee()
                    break;
                case 'Add role':
                    addRole()
                    break;
                case 'Add Employee':
                    inquirer.prompt([{
                        type: "input",
                        message: "Type employee's first name",
                        name: "addEmployeeFirst"
                    },
                    {
                        type: "input",
                        message: "Type employee's last name",
                        name: "addEmployeeLast"
                    },
                    {
                        type: "input",
                        message: "Type employee's role id #",
                        name: "addEmployeeid1"
                    },
                    { //Add choice for user to choose if the employee has a manager id or not
                        type: "input",
                        message: "Type employee's manager id (if applicable)",
                        name: "addEmployeeid2"
                    }


                    ]).then(answers => {
                        addEmployee(answers).then(res => {
                            menu();
                        })
                    })
                    break;
                case 'Add Department':
                    addDepartment()
                    break;
                case 'Exit':

                    process.exit(0);


            }
        });
}



menu();


