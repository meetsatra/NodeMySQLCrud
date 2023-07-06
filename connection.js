
const mysql = require('mysql2');

var mysqlConnection = mysql.createConnection({
    host:`localhost`,
    user:`root`,
    password:`8082800009`,
    database:`employeedb`
})
mysqlConnection.connect((err)=>{
    if(err){
        console.log(`Error is : ` + JSON.stringify(err,undefined,2));
    }else{
        console.log(`DB Connected Succesfully`);
    }
})
module.exports = mysqlConnection;