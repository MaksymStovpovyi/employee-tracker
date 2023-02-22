const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


// connection to database
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
            name: 'likeToDo',
            message: 'What would you like to do?',
            choices: [
                '1. view all departments', 
                '2. view all roles', 
                '3. view all employees', 
                '4. add a department', 
                '5. add a role', 
                '6. add an employee', 
                '7. update an employee role',
                '8. exit'
            ]
        }]).then((res) => {
            switch (res.likeToDo) {
                case '1. view all departments':
                    view('department');
                    break;
                case '2. view all roles':
                    view('role');
                    break;
                case '3. view all employees':
                    view('employee');
                    break;
                case '4. add a department':
                    addDep();
                    break;
                case '5. add a role':
                    addRole();
                    break;
                case '6. add an employee':
                    break;
                case '7. update an employee role':
                    break;
                case '8. exit':
                    db.end();
                    break;
            }
        })
}
start();

// view function
function view(para) {
    db.query(`SELECT * FROM ${para}`, (err, result) => {
        console.table(result);
        start();
    })
}

// add a department
function addDep() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDep',
            message: 'Enter a new department name -->'
        }
    ]).then((res) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, res.newDep, (err, result) => {
            console.log('ok!');
            start();
        })
    })
}
// add a new role
const addRole = () => {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter a name of the role -->'
            },
            {
                type: 'input',
                name: 'newSalary',
                message: 'Enter salary -->'
            },
            {
                type: 'list',
                name: 'dep',
                message: 'Which department has this role?',
                choices: result.map(dep => dep.name)
            }
        ]).then((data) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, 
            [data.newRole, data.newSalary, result.find(dep => dep.name === data.dep).id], (err, res) => {
                console.log('ok!');
                start();
            })
        })
    })
}

