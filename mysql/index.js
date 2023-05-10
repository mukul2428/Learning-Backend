const express = require('express');
const con = require('./config');

const app = express();

//get api
app.get("/getStudent", (req, res) => {
    con.query("select * from student", (err, result) => {
        if (result) {
            res.send(result);
        } else {
            console.log(err);
        }
    })
})

//post api
app.use(express.json());
app.post("/createStudent", (req, res) => {
    con.query('INSERT INTO student SET ?', req.body, (err, result, fields) => {
        if (result) {
            res.send(result);
        } else {
            console.log(err);
        }
    })
})

//put api
app.put("/updateStudent/:roll_no", (req, res) => {
    const data = [req.body.name, req.body.marks, req.body.class, req.params.roll_no]
    con.query("UPDATE student SET name = ?, marks = ?, class = ? WHERE roll_no = ?", data, (err, result) => {
        if (result) {
            res.send(result);
        } 
        // if no data found for that id then we are creating new entry for that
        if (result.affectedRows == 0) {
            con.query('INSERT INTO student SET ?', req.body, (err, result, fields) => {
                if (result) {
                    res.send(result);
                } else {
                    console.log(err);
                }
            })
        } else {
            console.log(err);
        }
    })
})

//delete api
app.delete("/deleteStudent/:roll_no",(req,res)=>{
    con.query("DELETE FROM student where roll_no =" + req.params.roll_no, (err, result)=>{
        if (result) {
            res.send(result);
        } else {
            console.log(err);
        }
    })
})

app.listen(5000);