const db = require("./main/server/connections");
const inquirer = require("inquirer");

// Function to view all employees
function viewAllEmployees() {
  const sql = `SELECT * FROM employees`;
  console.log(sql);
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.table(rows);
  });
}

// Function to view all roles
function viewAllRoles() {
  const sql = `SELECT * FROM roles`;
  console.log(sql);
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.table(rows);
  });
}

// Function to view all departments
function viewAllDepartments() {
  const sql = `SELECT * FROM departments`;
  console.log(sql);
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.table(rows);
  });
}

// Function to add an employee
function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "Type employee's first name",
      name: "first_name",
    },
    // ... other prompts for employee information
  ]).then((answers) => {
    // Extracting answers into variables
    const { first_name, last_name, department_name, role_title, manager_id, role_salary } = answers;
    // Creating an employee object
    const employee = {
      first_name: first_name,
      last_name: last_name,
      department_name: department_name,
      role_title: role_title,
      manager_id: manager_id || null,
      role_salary: role_salary,
    };

    // Inserting the employee object into the database
    db.query("INSERT INTO employees SET ?", employee, (err, res) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log("Employee successfully added to list of employees!");
    });
  });
}

// Function to add a role
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter title of role",
      name: "role_title",
    },
    // ... other prompts for role information
  ]).then((answers) => {
    // Extracting answers into variables
    const { role_title, role_salary, department_id } = answers;
    // Creating a role object
    const role = {
      role_title: role_title,
      role_salary: role_salary,
      department_id: department_id,
    };

    // Inserting the role object into the database
    db.query("INSERT INTO roles SET ?", role, (err, res) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log("Role successfully added!");
    });
  });
}

// Function to add a department
function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "Type the name of the department",
      name: "department_name",
    },
  ]).then((answers) => {
    // Extracting answers into variables
    const { department_name } = answers;
    // Creating a department object
    const department = {
      department_name: department_name,
    };

    // Inserting the department object into the database
    db.query("INSERT INTO departments SET ?", department, (err, res) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log("Department successfully added!");
    });
  });
}

// Function to update an employee's role
const updateEmployee = () => {
  // Querying the employees table to get the list of employees
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) {
      console.log(err);
      return;
    }
    employees = employees.map((employee) => {
      // Mapping each employee to an object with name and value properties
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.employee_id,
      };
    });

    // Querying the roles table to get the list of roles
    db.query('SELECT * FROM roles', (err, roles) => {
      if (err) {
        console.log(err);
        return;
      }
      roles = roles.map((role) => {
        // Mapping each role to an object with name and value properties
        return {
          name: role.role_title,
          value: role.role_id,
        };
      });

      // Prompting the user to select an employee and a new role
      inquirer.prompt([
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
      ]).then((data) => {
        const selectedRole = roles.find((role) => role.value === data.selectNewRole);
        const roleTitle = selectedRole.name;

        // Updating the employee's role in the database
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

// Exporting the functions
module.exports = {
  viewAllEmployees,
  viewAllRoles,
  viewAllDepartments,
  addEmployee,
  addRole,
  addDepartment,
  updateEmployee,
};
