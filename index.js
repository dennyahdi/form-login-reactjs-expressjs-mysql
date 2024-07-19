const express = require('express')
const mysql = require("mysql");
const cors = require("cors");
 
const app = express();
const port = 3001
 
app.use(express.json());
app.use(cors());
 
const con = mysql.createConnection({
    user: "root",
    host: "",
    password: "",
    database: "dbtest"
})
 
app.post('/register', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
 
    con.query("INSERT INTO users (email, name, password) VALUES (?, ?, ?)", [email, name, password], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT DETAILS!"})
            }
        }
    )
})
 
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    con.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], 
        (err, result) => {
            if(err){
                req.setEncoding({err: err});
            }else{
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({message: "WRONG Email OR PASSWORD!"})
                }
            }
        }
    )
})
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})