const inquirer = require('inquirer');
const mysql = require('mysql2');


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

  async function queryRoles() {
    return new Promise((resolve, reject) => {
      db.query('select * from roles', function (err,results) {
        if (err) return reject(err);
        resolve(results);
       });
      });
  }

  async function queryEmployees() {
    return new Promise((resolve, reject) => {
      db.query('select * from employee', function (err,results) {
        if (err) return reject(err);
        resolve(results);
       });
      });
  }

  async function queryDepartments() {
    return new Promise((resolve, reject) => {
      db.query('select * from department', function (err,results) {
        if (err) return reject(err);
        resolve(results);
       });
      });
  }


  const employeeTracker = () => { 
    return inquirer.prompt([
    {
    type: 'list',
    name: 'prompt',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'EXIT']
  }
]). then((answers) => {
   switch (answers.prompt) {
     case 'view all departments':
       viewDepartment();
       break;
     case 'view all roles':
       viewRoles();
       break;
     case 'view all employees':
       viewEmployees();
       break;
     case 'add a department':
       addDepartment();
       break;
     case 'add a role':
       addRole();
       break;
     case 'add an employee':
       addEmployee();
       break;
     case 'update an employee role':
       updateRole();
       break;
     case 'EXIT':
       db.end();
       break;

   }
  })
}

function viewDepartment() {
  db.query('select * from department', function(err,res) {
    console.log('Viewing all departments');
    console.table(res);
    employeeTracker();
  });
}

function viewRoles() {
  db.query('select * from roles', function(err, res) {
    console.log('Viewing all roles');
    console.table(res);
    employeeTracker();
});
}

function viewEmployees() {
  db.query('select * from employee', function(err, res) {
    console.log('Viewing all employees');
    console.table(res);
    employeeTracker();
});
}

function addDepartment() {
inquirer.prompt({
    type: 'input',
    name: 'department',
    message: 'What is the name of the department?',
}).then((answers) => {
  console.log(answers.department);
  db.query('INSERT INTO department SET ?',
  {dep_name: answers.department},
  function(err) {
    if (err) throw err;
    employeeTracker();
  }
  )
})
}

async function addEmployee() {
  let roless = await queryRoles();
inquirer.prompt([
  {
    type: 'input',
    name: 'firstName',
    message: 'What is the employees first name?'
  },
  { 
    type: 'input',
    name: 'lastName',
    message: 'What is the employees last name?'
  },
  {
    type: 'list',
    name: 'role',
    message: 'What is the employees role?',
    choices: roless.map((roles) => ({name: roles.title, value: roles.id}))
  },
  {
    type: 'input',
    name: 'manager',
    message: 'What is the managers Id?'
  },
])
.then((answers) => {
  db.query('INSERT INTO employee SET ?', {
    first_name: answers.firstName,
    last_name: answers.lastName,
    roles_id: answers.role,
    manager_id: answers.manager
  },
  function (err) {
    if(err) throw err;
    employeeTracker();
  }
  )})
}




async function addRole() {
  let departments = await queryDepartments();
  inquirer.prompt([
{ 
  type: 'input',
  name: 'title',
  message: 'What is the name of the role?',
},
{
  type: 'input',
  name: 'salary',
  message: 'What is the salary of the role?',
},
{
  type: 'list',
  name: 'department',
  message: 'Which department does the role belong to?',
  choices: departments.map((department) => ({name: department.dep_name, value: department.id})),
},
]).then((answers) => {
  db.query('INSERT INTO roles SET ?', {
    title: answers.title,
    salary: answers.salary,
    department_id: answers.department,
  },
  function (err) {
    if(err) throw err;
    employeeTracker();
  }
  )
})
}

async function updateRole() {
let employees = await queryEmployees();
let roless = await queryRoles();
inquirer.prompt([
  {
    type: 'list',
    name: 'employee',
    message: 'Which employees role do you want to update?',
    choices: employees.map((employee) => (
      {
        name: employee.first_name + '' + employee.last_name, 
        value: employee.id
      }
    ))
  },
  {
    type: 'list',
    name: 'role', 
    message: 'What is their new role?',
    choices: roless.map((roles) => ({name: roles.title, value: roles.id})),
  }
]).then((answers) => {
  db.query( 'UPDATE employee SET ? WHERE ?',
  [
  {
    roles_id: answers.role,
  },
  {
    id: answers.employee,
  },
  ],
  function (err) {
    if(err) throw err;
    employeeTracker();
  }
  )
})
}


employeeTracker();