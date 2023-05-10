const express = require('express');
const EventEmitter = require('events'); //taking it in capital because it is a class

const app = express();
const event = new EventEmitter(); //creating object of event

app.get("/", (req,res)=>{
    res.send("Getting data");
    event.emit('btn_clicked');
})

//capturing events
let i = 0;
event.on('btn_clicked', ()=>{
    i++;
    console.log(`Clicked ${i} time`);
})

app.listen(5000);