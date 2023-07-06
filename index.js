const connection = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(express.json())
// app.use(bodyParser.json())

app.get('/employees',(req,res)=>{
    // http://localhost:3000/employees
    connection.query('SELECT * FROM employee',(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(rows);
            res.send(rows);
        }
    })
})

app.get('/employees/:id',(req,res)=>{
    // http://localhost:3000/employees/1
    connection.query('SELECT * FROM employee WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(rows);
            res.send(rows);
        }
    })
})

app.delete('/employees/:id',(req,res)=>{
    // http://localhost:3000/employees/1
    connection.query('DELETE FROM employee WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(rows);
            res.send(rows);
        }
    })
})

app.post('/employees',(req,res)=>{
    // http://localhost:3000/employees/
    var emp = req.body
    console.log(emp);
    var empData = [emp.name,emp.salary]
    connection.query('INSERT INTO employee(name,salary) VALUES(?)',[empData],(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(rows);
            res.send(rows);
        }
    })
})

app.listen(3000,()=>console.log('Express server is running on port:3000'))