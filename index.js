// created packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

// database connection
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '_data747',
      database: '***'
    },
    console.log(`Connected to the *** database.`)
);