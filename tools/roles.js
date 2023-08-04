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

const viewRoles = () => {
  return db.query(`SELECT * FROM roles`, (err, result) => {
    if (err) {
      throw err
  }else {
      console.log("Viewing all roles: ");
      console.table(result);}

  });
    }


const addRoles = () => {
    return inquirer.prompt([
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
                validate: (salaryInput) => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log('Please add a salary.');
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
})}


const updateRoles = () => {
   return inquirer.prompt([
        {
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
            
        }
        );
});
}



    module.exports = {viewRoles, addRoles, updateRoles};


