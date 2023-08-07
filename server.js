const inquirer = require('inquirer');
const mysql = require('mysql2');

const {viewRoles, addRoles, updateRoles} = require('./tools/roles');
const {viewDepartment, addDepartment} = require('./tools/departments.js');
const {viewEmployees, addEmployees} = require('./tools/employees.js')


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'machala',
      database: 'employees_db'
    },
    console.log(`Connected to the employee database.`)
  );




  const employeeTracker = () => { 
    return inquirer.prompt([
    {
    type: 'list',
    name: 'prompt',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'go back to main menu']
  }
]). then (async({prompt}) => {
   
    if (prompt === "view all departments") {
        viewDepartment();
        setTimeout(employeeTracker, 2000);
      } else if (prompt === "view all roles") {
        viewRoles();
        setTimeout(employeeTracker, 2000);
      } else if (prompt === "view all employees") {
        viewEmployees();
        setTimeout(employeeTracker, 2000);
      } else if (prompt === "add a department") {
        addDepartment();
        setTimeout(employeeTracker, 5000);
      } else if (prompt === "add a role") {
        addRoles();
        setTimeout(employeeTracker, 10000);
      } else if (prompt === "add an employee") {
        addEmployees();
        setTimeout(employeeTracker, 10000);
      } else if (prompt === "update an employee role") {
        updateRoles();
        setTimeout(employeeTracker, 10000);
      } else {
        console.log("Please select an option.");
        employeeTracker();
      }
    }
) ;
  }
employeeTracker();

