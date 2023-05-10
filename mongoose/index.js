// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/e-com");
// const productSchema = new mongoose.Schema({
//     name: String,
//     category: String,
//     price: String,
//     size: String
// })

// //crud operations
// const saveInDB = async () => {
//     const productModel = mongoose.model('products', productSchema);
//     const result = await new productModel({
//         name: "Undergarments",
//         category: "HSK",
//         price: "9380",
//         size: "L"
//     }).save();
//     console.log(result);
// }
// // saveInDB();

// const updateInDB = async () => {
//     const productModel = mongoose.model('products', productSchema);
//     const result = await productModel.updateOne(
//         { name: "Undergarments" },
//         { $set: { category: "ABCD", price: "101010" }}
//     )
//     console.log(result);
// }
// // updateInDB();

// const deleteInDB = async () => {
//     const productModel = mongoose.model('products', productSchema);
//     const result = await productModel.deleteOne(
//         {name: "Trouser"}
//     )
//     console.log(result);
// }
// // deleteInDB();

// const findInDB = async () => {
//     const productModel = mongoose.model('products', productSchema);
//     const result = await productModel.find();
//     console.log(result);
// }
// findInDB();

// apis
const express = require('express');
const multer = require('multer');
require("./config");
const Product = require('./product');
const app = express();

app.use(express.json());
app.post("/create", async (req, resp) => {
    let data = new Product(req.body);
    const result = await data.save();
    resp.send(result);
});

app.get("/list", async (req, resp) => {
    let data = await Product.find();
    resp.send(data);
})

app.delete("/delete/:_id", async (req, resp) => {
    console.log(req.params)
    let data = await Product.deleteOne(req.params);
    resp.send(data);
})


app.put("/update/:_id",async (req, resp) => {
    console.log(req.params)
    let data = await Product.updateOne(
        req.params,
        {$set: req.body}
    );
    resp.send(data);
})

//search api
app.get("/search/:item", async (req,res)=>{
    let response = await Product.find(
        {
            "$or":[
                {"name": {$regex:req.params.item}},
                {"category": {$regex:req.params.item}},
            ]
        }
    );
    res.send(response);
})

//upload file

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single('file_name'); 
// upload will be passed as a middleware
app.post("/upload", upload, (req,res)=>{
    res.send("file uploaded")
})

app.listen(5000)