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


// INSERT DATA
app.post('/employees',(req,res)=>{
    // http://localhost:3000/employees/
    var emp = req.body
    console.log(emp);
    var empData = [emp.name,emp.salary]
    connection.query('INSERT INTO employee(name,salary) VALUES(?)',[empData],(err,rows)=>{
        // Inside body:
        // {
        //     "name": "Meet",
        //     "salary": 50000
        // }
        if(err){
            console.log(err);
        }else{
            // console.log(rows);
            res.send(rows);
        }
    })
})

// 2 Methods for updating the data 
// PATCH - if you want to update 1 or more field values in a row (salary/name)
// PUT - if u want to update all the fields in a row (id,salary,name)
// 1. PATCH
app.patch('/employees',(req,res)=>{
    // http://localhost:3000/employees/
    var emp = req.body
    
    connection.query('UPDATE employee SET ? WHERE id='+emp.id,[emp],(err,rows)=>{
        // Inside body:
        // {
        //     "id": 1,
        //     "name": "Jay", 
        //     "salary": 60000
        // }
        // OR
        // {
        //     "id": 1,
        //     "name": "Jay"
        // }
        // OR
        // {
        //     "id": 1,
        //     "salary": 60000
        // }
        if(err){
            console.log(err);
        }else{
            // console.log(rows);
            res.send(rows);
        }
    })
})
// 2. PUT
app.put('/employees', (req, res) => {
    // http://localhost:3000/employees/
    var emp = req.body;
  
    connection.query('UPDATE employee SET ? WHERE id = ?', [emp, emp.id], (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error occurred while updating data.');
      } else {
        if (rows.affectedRows == 0) {
          // If no rows were affected by the update (no matching id found), insert a new row
          var empData = [emp.id,emp.name, emp.salary];
          console.log(empData);
          connection.query('INSERT INTO employee (id, name, salary) VALUES (?)', [empData], (err, rows) => {
            if (err) {
              console.log(err);
              res.status(500).send('Error occurred while inserting data.');
            } else {
              res.send(rows);
            }
          });
        } else {
          res.send(rows);
        }
      }
    });
  });
  

app.listen(3000,()=>console.log('Express server is running on port:3000'))