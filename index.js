const inquirer = require("inquirer")
const {viewAllEmployees,addEmployee}=require("./queries.js")

function menu(){
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
                inquirer.prompt([

                ]).then(answers=>{
                    addEmployee(answers)
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


