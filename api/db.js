const mysql= require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'railwaymanage'
}) ;

conn.connect((error)=>{
    if(!error){
        console.log('Connected to database');
    }
    else{
        console.error('Database error', error);
    }
})
module.exports=conn;