const express= require('express');
const router= express.Router();
const db= require('./db');
const jwt = require('jsonwebtoken');

router.post('/register',(req,res)=>{
    const {username, password, role}=req.body;
    db.query('SELECT * FROM Users WHERE username = ?',[username],(err,results)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:'Error in Internal Server'});
            return;
        }
        if (results.length > 0) {
            res.status(400).json({ error: 'You have registered yourself before, Please Log in to continue' });
            return;
          }
         db.query('INSERT INTO Users (username, password, role) VALUES (?, ?, ?)', [username, password, role], (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Error in Internal Server' });
              return;
            }
        const token = jwt.sign({username, role},'secure_key');
        res.status(201).json({ message: 'User registered successfully', token });
    });
});
});
module.exports=router;