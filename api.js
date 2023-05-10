//api integration with mongodb
const dbConnect = require('./mongodb');
const express = require('express');
const mongodb = require('mongodb');

const app = express();
app.use(express.json());

//get
app.get('/', async (req, res) => {
    const db = await dbConnect();
    const response = await db.find().toArray();
    console.log(response);
    res.send(response);
})

//post
app.post('/', async (req, res) => {
    const db = await dbConnect();
    const response = await db.insertOne(req.body);
    res.send(response);
})

//post - update with body
app.put('/', async (req, res) => {
    const db = await dbConnect();
    const response = await db.updateOne(
        { category: req.body.category },
        { $set: req.body }
    );
    res.send(response);
})
//post - update with param
app.put('/:price', async (req, res) => {
    const db = await dbConnect();
    const response = await db.updateOne(
        { price: req.params.price },
        { $set: { price: req.body.price } }
    );
    res.send(response);
})

//delete data
app.delete('/:id', async (req, res) => {
    const db = await dbConnect();
    const response = await db.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
    res.send(response);
})

app.listen(4200);