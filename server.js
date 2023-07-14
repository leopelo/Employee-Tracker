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

  
  const employeeTracker= () => inquirer
  .prompt([
    {
    type: 'list',
    name: 'prompt',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
  }])
//results depending on selection
.then((answers) => { 
  if(answers.prompt === 'view all departments') {
  
  db.query('SELECT * FROM department', (err, result) => {
    if (err) {
        throw err
    }else {
      console.log('Viewing all departments:');
      console.table(result);
    }
    });
    
  } else if (answers.prompt === 'view all roles') {
    db.query(`SELECT * FROM roles`, (err, result) => {
      if (err) {
        throw err
    }else {
        console.log("Viewing all roles: ");
        console.table(result);}

    });
  } else if (answers.prompt === 'view all employees') {
      db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
          throw err
      }else {
            console.log('Viewing all employees:');
            console.table(result);
          }
        });
       }else if (answers.prompt === 'add a department') {
            inquirer
            .prompt([
              {
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
      
      
                    } else {
                        console.log('Please add a department.');
                        return false;
                    }
          }}])
            .then((answers) => {
      
      
              db.query(`INSERT INTO department (dep_name) VALUES (?)`, [answers.department], (err, result) => {
                if (err) {
                  throw err
              }else {
                  console.log(`Added ${answers.department} to the database.`)}
             
            });
        })
        }else if (answers.prompt === 'add a role') {
         
          db.query(`SELECT * FROM department`, (err, result) => {
            if (err) {
              throw err;
          };
              inquirer
              .prompt([
                  {
                      type: 'input',
                      name: 'role',
                      message: 'What is the name of the role?',
                      validate: roleInput => {
                          if (roleInput) {
                              return true;
                          } else {
                              console.log('Please add a role.');
                              return false;
                          }
                      }
                  },
                  {
                      type: 'input',
                      name: 'salary',
                      message: 'What is the salary of the role?',
                      validate: salaryInput => {
                          if (salaryInput) {
                              return true;
                          } else {
                              console.log('Please add a salary!');
                              return false;
                          }
                      }
                  },
                  {
                     
                      type: 'list',
                      name: 'department',
                      message: 'Which department does the role belong to?',
                      choices: () => {
                          var array = [];
                          for (var i = 0; i < result.length; i++) {
                              array.push(result[i].name);
                          }
                          return array;
                      }
                  }
              ]).then((answers) => {
                 
                  for (var i = 0; i < result.length; i++) {
                      if (result[i].name === answers.department) {
                          var department = result[i];
                      }
                  }
                    const sql= `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                  db.query(sql, [answers.role, answers.salary, department.id], (err, result) => {
                    if (err) {
                      throw err
                  }else {
                        console.log(`Added ${answers.role} to the database.`)
                      }
                     
                  });
              })
          });
      } else if (answers.prompt === 'add an employee') {
          // Calling the database to acquire the roles and managers
          db.query(`SELECT * FROM employee, roles`, (err, result) => {
            if (err) {
              throw err}
      
      
              inquirer.prompt([
                  {
                      // Adding Employee First Name
                      type: 'input',
                      name: 'firstName',
                      message: 'What is the employees first name?',
                      validate: firstNameInput => {
                          if (firstNameInput) {
                              return true;
                          } else {
                              console.log('Please add first name.');
                              return false;
                          }
                      }
                  },
                  {
                      // Adding Employee Last Name
                      type: 'input',
                      name: 'lastName',
                      message: 'What is the employees last name?',
                      validate: lastNameInput => {
                          if (lastNameInput) {
                              return true;
                          } else {
                              console.log('Please add last name.');
                              return false;
                          }
                      }
                  },
                  {
                      // Adding Employee Role
                      type: 'list',
                      name: 'role',
                      message: 'What is the employees role?',
                      choices: () => {
                          var array = [];
                          for (var i = 0; i < result.length; i++) {
                              array.push(result[i].title);
                          }
                          var newArray = [...new Set(array)];
                          return newArray;
                      }
                  },
                  {
                      // Adding Employee Manager
                      type: 'input',
                      name: 'manager',
                      message: 'Who is the employees manager?',
                      validate: managerInput => {
                          if (managerInput) {
                              return true;
                          } else {
                              console.log('Please add manager.');
                              return false;
                          }
                      }
                  }
              ]).then((answers) => {
                  // Comparing the result and storing it into the variable
                  for (var i = 0; i < result.length; i++) {
                      if (result[i].title === answers.role) {
                          var role = result[i];
                      }
                  }
                  const sql= `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`;
                  db.query(sql, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                      if (err) throw err;
                      console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
      
      
                  });
              })
          });
      } else if (answers.prompt === 'update an employee role') {
          // Calling the database to acquire the roles and managers
          db.query(`SELECT * FROM employee, roles`, (err, result) => {
            if (err) {
              throw err}
      
      
              inquirer.prompt([
                  {
                      // Choose an Employee to Update
                      type: 'list',
                      name: 'employee',
                      message: 'Which employees role do you want to update?',
                      choices: () => {
                          var array = [];
                          for (var i = 0; i < result.length; i++) {
                              array.push(result[i].last_name);
                          }
                          var employeeArray = [...new Set(array)];
                          return employeeArray;
                      }
                  },
                  {
                      // Updating the New Role
                      type: 'list',
                      name: 'role',
                      message: 'What is their new role?',
                      choices: () => {
                          var array = [];
                          for (var i = 0; i < result.length; i++) {
                              array.push(result[i].title);
                          }
                          var newArray = [...new Set(array)];
                          return newArray;
                      }
                  }
              ]).then((answers) => {
                  // Comparing the result and storing it into the variable
                  for (var i = 0; i < result.length; i++) {
                      if (result[i].last_name === answers.employee) {
                          var name = result[i];
                      }
                  }
      
      
                  for (var i = 0; i < result.length; i++) {
                      if (result[i].title === answers.role) {
                          var role = result[i];
                      }
                  }
      
      
                  db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                      if (err){
                        throw err}
                      console.log(`Updated ${answers.employee} role to the database.`)

                  });
              })
          });
      }
      })

      employeeTracker();
