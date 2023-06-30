const db = require("./connections.js");
const inquirer = require("inquirer");


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



function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Type employee's first name",
            name: "first_name"
        },
        {
            type: "input",
            message: "Type employee's last name",
            name: "last_name"
        },
        {
            type: "list",
            message: "Choose a department",
            name: "department_name",
            choices:[
                "IT",
                "Finance & Accounting",
                "Sales & Marketing",
                "Operations",
            ]
        },
        {
            type: "list",
            message: "Choose role",
            name: "role_title",
            choices:[
                "Full Stack Developer",
                "Software Engineer",
                "Accountant",
                "Financial Anylyst",
                "Marketing Coordinator",
                "Sales Lead",
                "Project Manager",
                "Operations Manager"
            ]
        },
        { //Add choice for user to choose if the employee has a manager id or not
            type: "input",
            message: "Enter employee's manager id (leave empty if not applicable)",
            name: "manager_id"
        },
        {
            type: "input",
            message: "Type employee's salary",
            name: "role_salary"
        }
    ]).then(answers => {
        const { first_name, last_name, department_name, role_title, manager_id, role_salary } = answers
        const employee = {
            first_name: first_name,
            last_name: last_name,
            department_name:department_name,
            role_title:role_title,
            manager_id: manager_id || null,
            role_salary:role_salary
        }

        db.query("INSERT INTO employees SET ?", employee, (err, res) => {
            if (err) {
                console.error(err.message);
                return;
            }
                console.log("Employee successfully added to list of employees!");
                
        });
    });
}


function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter title of role",
            name: "role_title",
        },
        {
            type: "input",
            message: "Enter salary for this role",
            name: "role_salary"
        },
        {
            type: "input",
            message: "Enter the id # for the department",
            name: "department_id",
        },

    ]).then(answers => {
        const { role_title, role_salary, department_id} = answers
        const role = {
            role_title: role_title,
            role_salary: role_salary,
            department_id: department_id,
        }

        db.query("INSERT INTO roles SET ?", role, (err, res) => {
            if (err) {
                console.error(err.message);
                return;
            }
                console.log("Role successfully added!");
                
        });
    });

   
};

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "type the name of the department",
            name: "department_name"
        },
    
    ]).then(answers => {
        const {department_name} = answers
        const department = {
            department_name: department_name,
        }

        db.query("INSERT INTO departments SET ?", department, (err, res) => {
            if (err) {
                console.error(err.message);
                return;
            }
                console.log("Department successfully added!");
                
        });
    });
 
};


const updateEmployee = () => {
    db.query('SELECT * FROM employees', (err, employees) => {
      if (err) {
        console.log(err);
        return;
      }
      employees = employees.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.employee_id,
        };
      });
  
      db.query('SELECT * FROM roles', (err, roles) => {
        if (err) {
          console.log(err);
          return;
        }
        roles = roles.map((role) => {
          return {
            name: role.role_title,
            value: role.role_id,
          };
        });
  
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'selectEmployee',
              message: 'Select employee to update...',
              choices: employees,
            },
            {
              type: 'list',
              name: 'selectNewRole',
              message: 'Select new employee role...',
              choices: roles,
            },
          ])
          .then((data) => {
            const selectedRole = roles.find((role) => role.value === data.selectNewRole);
            const roleTitle = selectedRole.name;
  
            db.query(
              'UPDATE employees SET ?, ? WHERE ?',
              [
                {
                  role_id: data.selectNewRole,
                },
                {
                  role_title: roleTitle,
                },
                {
                  employee_id: data.selectEmployee,
                },
              ],
              function (err) {
                if (err) {
                  console.log(err);
                  return;
                }
                console.log('Employee role updated');
              }
            );
          });
      });
    });
  };
  
module.exports = {
    viewAllEmployees, viewAllRoles, viewAllDepartments, addEmployee, addRole, addDepartment,updateEmployee
}
