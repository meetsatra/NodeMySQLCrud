const mysql = require('mysql2');
// const { Connection } = require('mysql2/typings/mysql/lib/Connection');
var mysqlConnection = mysql.createConnection({
    host:`localhost`,
    user:`root`,
    password:`8082800009`,
    database:`employeedb`
})
var connection = mysqlConnection.connect((err)=>{
    if(err){
        console.log(`Error is : ` + JSON.stringify(err,undefined,2));
    }else{
        console.log(`DB Connected Succesfully`);
    }
})
module.exports = connection;