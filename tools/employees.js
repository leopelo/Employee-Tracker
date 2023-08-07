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
  
const viewEmployees = () => {
  return db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
      throw err
  }else {
        console.log('Viewing all employees:');
        console.table(result);
       

      }
    });
    }


const addEmployees = () => {
    return  inquirer.prompt([
        {
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
            type: 'list',
            name: 'role',
            message: 'What is the employees role?',
            choices: role.map((role) => ({name: role.title, value: role.id}) )
            
            
            /*() => {
                var array = [];
                for (var i = 0; i < result.length; i++) {
                    array.push(result[i].title);
                }
                var newArray = [...new Set(array)];
                return newArray;
            }*/
        },
        {
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
    ])
    .then((answers) => {
        for (var i = 0; i < result.length; i++) {
            if (result[i].title === answers.role) {
                var role = result[i];
            }
        }
        const sql= `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`;
        db.query(sql, [answers.firstName, answers.lastName, role.id, answers.manager], (err, result) => {
            if (err) throw err;
            console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
        


        });
})}

module.exports = {viewEmployees, addEmployees};
    