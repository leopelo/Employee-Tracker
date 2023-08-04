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
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
  }
]). then (async({prompt}) => {
    switch (prompt) {
        case "view all departments":
             viewDepartment()
             await init();
        case "view all roles":
             viewRoles()
        case "view all employees":
            return viewEmployees()
        case "add a department":
            return addDepartment()
        case 'add a role':
            return addRoles()
        case 'add an employee':
            return addEmployees()
        case 'update an employee role':
            return updateRoles()
        default:
            break;
        
    }
})
}



function init() {
    employeeTracker();
} 

init();


module.exports = {init};
  //const employeeTracker= () => 
 
//results depending on selection

