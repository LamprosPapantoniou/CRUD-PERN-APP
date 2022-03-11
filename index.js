const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); //req.body


//ROUTES//

//create an employee

app.post('/employees', async (req, res) =>{
    try{
        const {first_name} = req.body;
        const {last_name} = req.body;
        const {birth_date} = req.body;
        const {afm} = req.body;
        const newEmployee = await pool.query(
            "INSERT INTO employees (first_name, last_name, birth_date, afm) VALUES($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, birth_date, afm]
        );
        res.json(newEmployee.rows[0]);
    } catch (err){
        console.error(err.message);
    }
});


//get all employees

app.get('/employees', async (req, res) =>{
    try{
        const allEmployees = await pool.query(
            "SELECT * FROM employees"
        );
        res.json(allEmployees.rows);
    }catch (err){
        console.error(err.message);
    }
});

//get an employee

app.get('/employees/:em_id', async (req, res) =>{
    try{
        const { em_id } = req.params;
        const employee = await pool.query(
            'SELECT * FROM employees WHERE em_id = $1',
            [em_id]
        );
        res.json(employee.rows[0]);
    }catch (err){
        console.log(err.message);
    }
});
//update an employee

app.put('/employees/:em_id', async (req, res) =>{
    try{
        const {em_id} = req.params;
        const {first_name} = req.body;
        const {last_name} = req.body;
        const {birth_date} = req.body;
        const {afm} = req.body;
        const updateEmployee = await pool.query(
            'UPDATE employees SET first_name=$1, last_name=$2, birth_date=$3, afm=$4 WHERE em_id = $5',
            [first_name, last_name, birth_date, afm, em_id ]
        );
        res.json('EMPLOYEE WAS UPDATED!!');
    }catch (err){
        console.error(err.message);
    }
});

//delete an employee

app.delete('/employees/:em_id', async (req, res) =>{
    try{
        const {em_id} = req.params;
        const deleteEmployee = await pool.query(
            'DELETE FROM employees WHERE em_id=$1',
            [em_id]
        );
        res.json('EMPLOY WAS DELETED!!');
    }catch (err){
        console.error(err.message);
    }
});



app.listen(5000, () => {
    console.log('server has started on port 5000');
});