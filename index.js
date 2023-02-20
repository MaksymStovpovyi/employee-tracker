// created packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const fs = require('fs');

// database connection
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '_data747',
      database: 'employee_db'
    },
    console.log('')
);

inquirer
    .prompt([
        {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
        name: 'likeToDo',
        }
    ])
    .then((response) => {
        const { likeToDo } = response;

        if (likeToDo === 'view all departments') {
            viewAll('department');        
        } else if (likeToDo === 'view all roles') {
            viewAll('role');        
        } else if (likeToDo === 'view all employees') {
            viewAll('employee');        
        } else if (likeToDo === 'add a department') {
            add('department');
        } else if (likeToDo === 'add a role') {

        } else if (likeToDo === 'add an employee') {

        } else if (likeToDo === 'update an employee role') {

        }
    }
);

function viewAll(table) {
    console.log('');
    db.query(`SELECT * FROM ${table}`,(err, results) => {
        console.table(results);
    });
}



