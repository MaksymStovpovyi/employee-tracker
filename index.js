// Importing dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


// Creating connection to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '_data747',
        database: 'employee_db'
    },
    console.log(`Connected to the employees database.`)


);
// start function
function  start() {
    inquirer.prompt([{
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: 
            [
            'view all departments', 
            'view all roles', 
            'view all employees', 
            'add a department', 
            'add a role', 
            'add an employee', 
            'update an employee role',
            'exit'
            ]
    }]).then(() => {})}
        