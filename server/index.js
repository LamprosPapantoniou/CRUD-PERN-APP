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
        const { firstName } = req.body;
        const { lastName } = req.body;
        const { birthDate } = req.body;
        const { afm } = req.body;
        const newEmployee = await pool.query(
            'INSERT INTO employees (firstName, lastName, birthDate, afm) VALUES($1, $2, $3, $4) RETURNING *',
            [firstName, lastName, birthDate, afm]
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

app.get('/employees/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const employee = await pool.query(
            'SELECT * FROM employees WHERE id = $1',
            [id]
        );
        res.json(employee.rows[0]);
    }catch (err){
        console.error(null);
    }
});
//update an employee

app.put('/employees/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const { firstName } = req.body;
        const { lastName } = req.body;
        const { birthDate } = req.body;
        const { afm }  = req.body;
        const updateEmployee = await pool.query(
            'UPDATE employees SET firstName=$1, lastName=$2, birthDate=$3, afm=$4 WHERE id = $5',
            [firstName, lastName, birthDate, afm, id ]
        );
        res.json(updateEmployee.rows[0]);
    }catch (err){
        console.error(null);
    }
});

//delete an employee

app.delete('/employees/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const deleteEmployee = await pool.query(
            'DELETE FROM employees WHERE id=$1',
            [id]
        );
        res.json(deleteEmployee.rows[0]);
    }catch (err){
        console.error(null);
    }
});



app.listen(5000, () => {
    console.log('server has started on port 5000');
});