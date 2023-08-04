const inquirer = require('inquirer');
const mysql = require('mysql2');
const {init} = require('../server');



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


   function viewDepartment() {
    db.query('SELECT * FROM department', function(err, result) {
      if (err) {
        throw err
    }else {
      console.log('Viewing all departments:');
      console.table(result);
      
  
    }

    })
  };



const addDepartment = () => {
    return  inquirer.prompt([
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
})}

module.exports = {viewDepartment, addDepartment};
  


