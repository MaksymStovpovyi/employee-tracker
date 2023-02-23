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
                    addEmp();
                    break;
                case '7. update an employee role':
                    updateRole();
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
function addRole() {
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

// add an employee
function addEmp() {
    db.query(`SELECT * FROM employee`, (err, res) => {
        db.query(`SELECT * FROM role`, (err, resTwo) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the new employee --> '

                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the last name of the new employee --> '

                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Select the role of the new employee:',
                    choices: resTwo.map(role => role.title)
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Select the manager of new employee:',
                    choices: res.map(employee => `${employee.first_name} ${employee.last_name}`)
                }
            ]).then((data) => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, 
                [data.firstName, data.lastName, resTwo.find(role => role.title === data.role).id, res.find(employee => `${employee.first_name} ${employee.last_name}` === data.manager).id], (err, res) => {
                    console.log('ok!');
                    start();
                })
            })
        })
    })
}

// update role
function updateRole() {
    db.query(`SELECT * FROM employee`, (err, res) => {
        db.query(`SELECT * FROM role`, (err, resTwo) => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select the employee:',
                    choices: res.map(employee => `${employee.first_name} ${employee.last_name}`)
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Select the new role:',
                    choices: resTwo.map(role => role.title)
                }
            ]).then((data) => {
                db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, 
                [resTwo.find(role => role.title === data.role).id, res.find(employee => `${employee.first_name} ${employee.last_name}` === data.employee).id], 
                (err, res) => {
                    console.log('ok!');
                    start();
                })
            })
        })
    })
}